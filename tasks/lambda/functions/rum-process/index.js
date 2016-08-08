'use strict';

const s3 = new (require('aws-sdk').S3)({ apiVersion: '2006-03-01', region: 'eu-west-1' });
const MySQL = require('mysql');
const denodeify = require('denodeify');

exports.handle = (event, context, callback) => {

	const bucket = event.Records[0].s3.bucket.name;
	const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
	const s3params = { Bucket: bucket, Key: key };

	console.log('Received '+bucket+'/'+key);

	if (!key.match(/^.*\.log$/)) {
		return callback(new Error('Ignoring as non-RUM data'));
	} else if (!process.env.RUM_MYSQL_DSN) {
		return callback(new Error('Missing MySQL credentials.  Set RUM_MYSQL_DSN in environment.'));
	}

	const mysqlConn = MySQL.createConnection(process.env.RUM_MYSQL_DSN);
	const mysqlConnectPromise = denodeify(mysqlConn.connect.bind(mysqlConn))().then(() => console.log('MySQL Connected, env: '+env));

	const mysqlQuery = denodeify(mysqlConn.query.bind(mysqlConn));

	return s3.getObject(s3params).promise()
		.then(s3obj => {
			let data = s3obj.Body;
			if (data instanceof Buffer) {
				data = data.toString('utf-8');
			}
			const records = data
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
							data.feature_tests[k] = !!v;
						}
						return data;
					}, null)
				)
				.filter(item => item !== null)
			;

			console.log('Record count: '+records.length);
			return mysqlConnectPromise.then(() => records);
		})
		.then(records => {
			const deleteFilePromise = s3.deleteObject(s3params)
				.promise()
				.then(() => console.log('Deleted '+key))
			;
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
				.concat(deleteFilePromise)
			).then(() => console.log('Process complete'));
		})
		.then(mysqlConn.destroy.bind(mysqlConn))
		.then(() => callback())
		.catch(err => {
			console.log('Handling error');
			mysqlConn.destroy();
			callback(err.stack || err);
		})
	;
};

function round(number, precision) {
	const factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
