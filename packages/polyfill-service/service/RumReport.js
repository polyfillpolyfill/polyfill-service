"use strict";

const MySQL = require('mysql2/promise');
const Stats = require('fast-stats').Stats;

const UA = require('polyfill-library/lib/UA');
const polyfillio = require('polyfill-library');

function Perf(rawopts) {

	const optionsSchema = {
		metrics: {
			type: 'array',
			default:['perf_dns', 'perf_connect', 'perf_req', 'perf_resp', 'perf_total'],
			valid:['perf_dns', 'perf_connect', 'perf_req', 'perf_resp', 'perf_total']
		},
		dimensions: {
			type: 'array',
			default: ['data_center'],
			valid: ['data_center', 'country', 'refer_domain']
		},
		stats: {
			type: 'array',
			default: ['median', '95P'],
			valid: ['mean', 'median', '95P', '99P', 'std', 'min', 'max', 'count']
		},
		period: { type:'number', default: 30, min: 1, max: 60 },
		minSample: { type:'number', default: 500, min: 50 }
	};
	let dbconn;

	if (!process.env.RUM_MYSQL_DSN) throw new Error('RUM disabled.  See README for environment variables required for RUM reporting.');

	const options = validateOptions(rawopts, optionsSchema);

	const sqlFields = options.dimensions
		.concat(options.metrics)
		.map(fName => (fName === 'perf_total') ? '(perf_dns+perf_connect+perf_req+perf_resp) as perf_total' : fName)
		.join(', ')
	;

	const sqlQuery = `SELECT ${sqlFields} FROM requests WHERE req_time BETWEEN (CURDATE() - INTERVAL ${options.period} DAY) AND CURDATE() AND data_center IS NOT NULL AND perf_req IS NOT NULL LIMIT 1000000`;

	const dataPromise = MySQL.createConnection(process.env.RUM_MYSQL_DSN)
		.then(conn => {
			dbconn = conn;
			return conn.query(sqlQuery);
		})
		.then(results => {
			return dbconn.end().then(() => {
				const objdata = results[0].reduce((out, row) => {
					const key = options.dimensions.map(fieldName => row[fieldName]).join('-');
					if (!(key in out)) {
						const aggregateRow = {count:0};
						options.dimensions.forEach(fieldName => {
							aggregateRow[fieldName] = row[fieldName];
						});
						options.metrics.forEach(fieldName => {
							aggregateRow[fieldName] = new Stats();
						});
						out[key] = aggregateRow;
					}
					options.metrics.forEach(fieldName => {
						if (row[fieldName]) out[key][fieldName].push(row[fieldName]);
					});
					out[key].count++;
					return out;
				}, {});
				return Object.keys(objdata)

					// Convert to an array
					.map(key => objdata[key])

					// Remove any rows that don't have enough datapoints
					.filter(row => row.count > options.minSample)

					// Sort by number of datapoints
					.sort((rowa, rowb) => rowa.count < rowb.count ? 1 : -1)

					// Add derived data
					.map(row => {
						options.metrics.forEach(metric => {
							if (options.stats.includes('95P')) {
								row[metric+'_95P'] = row[metric].percentile(95);
							}
							if (options.stats.includes('99P')) {
								row[metric+'_99P'] = row[metric].percentile(99);
							}
							if (options.stats.includes('mean')) {
								row[metric+'_mean'] = row[metric].amean();
							}
							if (options.stats.includes('median')) {
								row[metric+'_median'] = row[metric].median();
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
							if (options.stats.includes('count')) {
								row[metric+'_count'] = row[metric].length; // Number of non-zero values for this metric
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
		SELECT dr.feature_name, r.ua_family, r.ua_version, ROUND((SUM(dr.result)/COUNT(*))*100) as pass_rate_pc, COUNT(DISTINCT r.ip) as ip_count, COUNT(DISTINCT refer_domain) as refer_source_count, COUNT(*) as total_count
		FROM requests r INNER JOIN detect_results dr ON r.id=dr.request_id
		WHERE req_time BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()
		GROUP BY dr.feature_name, r.ua_family, r.ua_version
		HAVING ip_count > 20 AND refer_source_count > 3
		ORDER BY feature_name, ua_family
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
							if (isTargeted && rec.pass_rate_pc > 80) {
								rec.targeting_status = 'False positive - remove targeting';
							} else if (!isTargeted && rec.pass_rate_pc < 20) {
								rec.targeting_status = 'False negative - add targeting';
							} else {
								return null; // Correctly targeted
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

const validateOptions = (raw, schema) => {
	return Object.keys(schema).reduce((out, k) => {
		if (!(k in raw)) {
			// Do nothing
		} else if (schema[k].type === 'array') {
			let candidate = Array.isArray(raw[k]) ? raw[k] : raw[k].split(',');
			if ('valid' in schema[k]) candidate = candidate.filter(x => schema[k].valid.includes(x));
			if (candidate.length) {
				out[k] = candidate;
			}
		} else if (schema[k].type === 'number') {
			let candidate = Number.parseFloat(raw[k]);
			if (!Number.isNaN(candidate)) {
				if ('min' in schema[k]) candidate = Math.max(candidate, schema[k].min);
				if ('max' in schema[k]) candidate = Math.min(candidate, schema[k].max);
				out[k] = candidate;
			}
		}
		if (!(k in out) && ('default' in schema[k])) {
			out[k] = schema[k].default;
		}
		return out;
	}, {});
};


module.exports = {
	Perf: Perf,
	Compat: Compat
};
