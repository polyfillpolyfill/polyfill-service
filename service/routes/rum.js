/* Endpoints for Real User Monitoring of detect and perf results */

'use strict';

const polyfillio = require('../../lib');
const UA = require('../../lib/UA');
const express = require('express');

let mysql;
if (process.env.RUM_MYSQL_DSN) {
	require('promise-mysql')
		.createConnection(process.env.RUM_MYSQL_DSN)
		.then(conn => {
			mysql = conn;
		})
		.catch(() => {
			console.error('RUM MYSQL connection failed.  Check server is up or unset RUM_MYSQL_DSN to disable database backend, and restart.');
			process.exit();
		})
	;
}

const router = express.Router();  // eslint-disable-line new-cap
const daterange = "req_time BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()";

router.get('/v2/getRumPerfData', (req, res) => {
	if (!mysql) {
		return res.status(500).json('MySQL connection not available');
	}

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');

	const perfFields = ['dns', 'connect', 'req', 'resp'];
	const perfSQL = perfFields.map(fieldName => `
		SUM(IF(perf_${fieldName} > 0, 1, 0)) as perf_${fieldName}_count_notnull,
		ROUND(MIN(perf_${fieldName})) as perf_${fieldName}_min,
		ROUND(MAX(perf_${fieldName})) as perf_${fieldName}_max,
		ROUND(AVG(NULLIF(perf_${fieldName}, 0)),2) as perf_${fieldName}_mean,
		ROUND(STD(NULLIF(perf_${fieldName}, 0)), 2) as perf_${fieldName}_std,
		SUBSTRING_INDEX(SUBSTRING_INDEX(GROUP_CONCAT(ROUND(perf_${fieldName}) ORDER BY perf_${fieldName} SEPARATOR ','), ',', FLOOR(0.95 * SUM(perf_${fieldName} IS NOT NULL)) + 1), ',', -1)+0 AS perf_${fieldName}_95,
		SUBSTRING_INDEX(SUBSTRING_INDEX(GROUP_CONCAT(ROUND(perf_${fieldName}) ORDER BY perf_${fieldName} SEPARATOR ','), ',', FLOOR(0.99 * SUM(perf_${fieldName} IS NOT NULL)) + 1), ',', -1)+0 AS perf_${fieldName}_99
	`).join(', ');
	const querySQL = `
		SELECT data_center, country, COUNT(*) as count, ${perfSQL}
		FROM requests
		WHERE ${daterange} AND data_center IS NOT NULL
		GROUP BY data_center, country
		HAVING count > 10
		ORDER BY count DESC
	`;
	mysql.query(querySQL)
		.then(toCSV.bind(null, req.query.headerrow))
		.then(res.end.bind(res))
	;
});

router.get('/v2/getRumCompatData', (req, res) => {
	if (!mysql) {
		return res.status(500).json('MySQL connection not available');
	}

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');

	const querySQL = `
		SELECT dr.feature_name, r.ua_family, r.ua_version, ROUND(SUM(dr.result)/COUNT(*)) as pass_rate, COUNT(DISTINCT r.ip) as ip_count, COUNT(*) as total_count
		FROM requests r INNER JOIN detect_results dr ON r.id=dr.request_id
		WHERE ${daterange}
		GROUP BY dr.feature_name, r.ua_family, r.ua_version
		ORDER BY ip_count DESC
	`;
	mysql.query(querySQL)
		.then(results => {
			return Promise.all(results.map(rec => {
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
		})
		.then(results => results.filter(rec => rec !== null))
		.then(toCSV.bind(null, req.query.headerrow))
		.then(res.end.bind(res))
	;
});

function toCSV(includeHeader, data) {
	const keys = Object.keys(data[0]);
	const headerRow = keys.map(key => `"${key}"`).join(",") + '\n';
	const dataRows = data.map(row => {
		return keys.map(key => (row[key] === null) ? '' : `"${row[key]}"`).join(",");
	}).join('\n');

	return ((includeHeader && includeHeader !== "0") ? headerRow : '') + dataRows;
}

module.exports = router;
