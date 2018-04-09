'use strict';

const s3 = new (require('aws-sdk').S3)({ apiVersion: '2006-03-01', region: 'eu-west-1' });
const MySQL = require('mysql2');
const denodeify = require('denodeify');

exports.handle = (event, context) => {

	const bucket = event.Records[0].s3.bucket.name;
	const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
	const s3params = { Bucket: bucket, Key: key };

	console.log('Received '+bucket+'/'+key);

	if (!key.match(/^.*\.log$/)) {
		return context.fail(new Error('Ignoring as non-RUM data'));
	} else if (!process.env.RUM_MYSQL_DSN) {
		return context.fail(new Error('Missing MySQL credentials.  Set RUM_MYSQL_DSN in environment.'));
	}
	const mysqlConn = MySQL.createConnection(process.env.RUM_MYSQL_DSN);

	const mysqlConnect = () => {
		return denodeify(mysqlConn.connect.bind(mysqlConn))()
			.then(() => console.log('MySQL Connected to '+process.env.RUM_MYSQL_DSN))
		;
	};
	const mysqlDisconnect = () => {
		return denodeify(mysqlConn.end.bind(mysqlConn))()
			.then(() => console.log('MySQL disconnected'))
		;
	};
	const mysqlQuery = denodeify(mysqlConn.query.bind(mysqlConn));

	s3.getObject(s3params).promise()
		.then(s3obj => {
			let filestr = s3obj.Body;
			if (filestr instanceof Buffer) {
				filestr = filestr.toString('utf-8');
			}
			console.log('Loaded from S3, size: ' + filestr.length);
			const records = filestr
				.trim()
				.split('\n')
				.map(line => line
					.replace(/^.*?\]\: /, '')
					.split('&')
					.reduce((data, field) => {
						const perfProps = ["dns", "connect", "req", "resp"];
						const copyProps = ["elapsed_msec", "country", "data_center", "refer_domain", "ip"];
						const parts = field.split('=', 2);
						if (parts.length !== 2) return data;
						const k = parts[0];
						const v = decodeURIComponent(parts[1]);
						if (!data) {
							data = {feature_tests:{}};
						}
						if (perfProps.indexOf(k) !== -1) {
							data['perf_'+k] = round(parseFloat(v), 3);
						} else if (copyProps.indexOf(k) !== -1) {
							data[k] = v;
						} else if (k === 'ua') {
							const uaparts = v.split('/');
							data.ua_family = uaparts[0];
							data.ua_version = uaparts[1];
						} else {
							data.feature_tests[k] = (parseInt(v, 10) === 1) ? 1 : 0;
						}
						return data;
					}, null)
				)
				.filter(item => item !== null)
			;

			if (records.length) {
				console.log('Processed. Record count: '+records.length);
				return mysqlConnect()
					.then(() => {
						return Promise.all(
							records.map(rec => {
								const featuredata = rec.feature_tests;
								delete rec.feature_tests;
								return mysqlQuery('INSERT INTO requests SET ?', rec)
									.then(result => {
										const reqid = result.insertId;
										return mysqlQuery('INSERT INTO detect_results (id, request_id, feature_name, result) VALUES ' +
											Object.keys(featuredata)
												.map(f => `(null, ${reqid}, ${mysqlConn.escape(f)}, ${mysqlConn.escape(featuredata[f])})`)
												.join(', ')
										);
									})
								;
							})
						);
					})
					.then(mysqlDisconnect)
					.then(() => s3.deleteObject(s3params).promise().then(() => console.log('Deleted '+key)))
				;
			} else {
				console.log('No records found in log file.  First line:', filestr.split('\n', 2)[0]);
			}
		})
		.then(() => {
			console.log('Finished');
			context.succeed();
		})
		.catch(err => {
			console.log('Handling error');
			mysqlConn.destroy();
			context.fail(err.stack || err);
		})
	;
};

function round(number, precision) {
	const factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
