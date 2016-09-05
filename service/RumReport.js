
const MySQL = require('mysql2/promise');
const Stats = require('fast-stats').Stats;

const UA = require('../lib/UA');
const polyfillio = require('../lib/index');

function Perf(options) {

	let dbconn;

	if (!process.env.RUM_MYSQL_DSN) return;

	options = Object.assign({
		groupingFields: ['data_center'],
		metricFields: ['perf_dns', 'perf_connect', 'perf_req', 'perf_resp', 'perf_total'],
		stats: [],
		period: 30,
		minSampleSize: 20
	}, options);

	const sqlFields = options.groupingFields
		.concat(options.metricFields)
		.map(fName => (fName === 'perf_total') ? '(perf_dns+perf_connect+perf_req+perf_resp) as perf_total' : fName)
		.join(', ')
	;

	const sqlQuery = `SELECT ${sqlFields} FROM requests WHERE req_time BETWEEN (CURDATE() - INTERVAL ${options.period} DAY) AND CURDATE() AND data_center IS NOT NULL`;

	const dataPromise = MySQL.createConnection(process.env.RUM_MYSQL_DSN)
		.then(conn => {
			dbconn = conn;
			return conn.query(sqlQuery);
		})
		.then(results => {
			return dbconn.end().then(() => {
				const objdata = results[0].reduce((out, row) => {
					const key = options.groupingFields.map(fieldName => row[fieldName]).join('-');
					if (!(key in out)) {
						const aggregateRow = {};
						options.groupingFields.forEach(fieldName => {
							aggregateRow[fieldName] = row[fieldName];
						});
						options.metricFields.forEach(fieldName => {
							aggregateRow[fieldName] = new Stats();
						});
						out[key] = aggregateRow;
					}
					options.metricFields.forEach(fieldName => out[key][fieldName].push(row[fieldName]));
					return out;
				}, {});
				return Object.keys(objdata)

					// Convert to an array
					.map(key => objdata[key])

					// Remove any rows that don't have enough datapoints
					.filter(row => row[options.metricFields[0]].length > options.minSampleSize)

					// Sort by number of datapoints
					.sort((a, b) => a[options.metricFields[0]].length < b[options.metricFields[0]].length ? 1 : -1)

					// Add derived data
					.map(row => {
						row.count = row[options.metricFields[0]].length;
						options.metricFields.forEach(metric => {
							if (options.stats.includes('95P')) {
								row[metric+'_95'] = row[metric].percentile(95);
							}
							if (options.stats.includes('99P')) {
								row[metric+'_99'] = row[metric].percentile(99);
							}
							if (options.stats.includes('mean')) {
								row[metric+'_mean'] = row[metric].amean();
							}
							if (options.stats.includes('std')) {
								row[metric+'_std'] = row[metric].stddev();
							}
							if (options.stats.includes('min')) {
								row[metric+'_min'] = row[metric].range()[0];
							}
							if (options.stats.includes('max')) {
								row[metric+'_max'] = row[metric].range()[1];
							}
							if (options.stats.length) {
								delete row[metric];
							}
						});

						// Round numeric values
						Object.keys(row).forEach(f => {
							if (typeof row[f] === 'number') row[f] = Math.round(row[f]*100)/100;
						});

						return row;
					})
				;
			});
		})
		.catch(err => {
			console.log(err);
			return [];
		})
	;

	return {
		getStats: () => dataPromise
	};
}

function Compat() {
	let dbconn;

	if (!process.env.RUM_MYSQL_DSN) return;

	const querySQL = `
		SELECT dr.feature_name, r.ua_family, r.ua_version, ROUND(SUM(dr.result)/COUNT(*)) as pass_rate, COUNT(DISTINCT r.ip) as ip_count, COUNT(*) as total_count
		FROM requests r INNER JOIN detect_results dr ON r.id=dr.request_id
		WHERE req_time BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()
		GROUP BY dr.feature_name, r.ua_family, r.ua_version
		ORDER BY ip_count DESC
	`;
	const dataPromise = MySQL.createConnection(process.env.RUM_MYSQL_DSN)
		.then(conn => {
			dbconn = conn;
			return conn.query(querySQL);
		})
		.then(results => {
			return dbconn.end().then(() => {
				return Promise.all(results[0].map(rec => {
					return polyfillio.describePolyfill(rec.feature_name)
					.then(polyfill => {
						if (!polyfill) {
							return null;
						} else {
							const ua = new UA(rec.ua_family + '/' + rec.ua_version);
							const isTargeted = (polyfill.browsers && polyfill.browsers[rec.ua_family] && ua.satisfies(polyfill.browsers[rec.ua_family]));
							rec.is_targeted = isTargeted ? 'Yes' : 'No';
							if (rec.ip_count < 5) {
								rec.targeting_status = 'Not enough data';
							} else if ((isTargeted && rec.pass_rate < 0.2) || (!isTargeted && rec.pass_rate > 0.8)) {
								rec.targeting_status = 'Correct';
							} else if (isTargeted && rec.pass_rate > 0.8) {
								rec.targeting_status = 'False positive';
							} else if (!isTargeted && rec.pass_rate < 0.2) {
								rec.targeting_status = 'False negative';
							} else {
								rec.targeting_status = 'Inconclusive';
							}
							return rec;
						}
					});
				}));
			});
		})
		.then(results => results.filter(rec => rec !== null))
	;

	return {
		getStats: () => dataPromise
	};
}

module.exports = {
	Perf: Perf,
	Compat: Compat
};
