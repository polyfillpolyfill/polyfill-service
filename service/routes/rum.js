/* Endpoints for Real User Monitoring of detect and perf results */

'use strict';

const express = require('express');

let mysql;
if (process.env.MYSQL_DSN) {
	require('promise-mysql')
		.createConnection(process.env.MYSQL_DSN)
		.then(conn => {
			mysql = conn;
		})
		.catch(() => {
			console.error('MYSQL connection failed.  Check server is up or unset MYSQL_DSN to disable database backend');
			process.exit();
		})
	;
}

const router = express.Router();  // eslint-disable-line new-cap

router.get('/v2/getRumPerfData', (req, res) => {
	const daterange = "req_time BETWEEN (CURDATE() - INTERVAL 30 DAY) AND CURDATE()";
	if (!mysql) {
		return res.status(500).json('MySQL connection not available');
	}

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');

	mysql.query('SELECT COUNT(*) as count FROM requests WHERE '+daterange)
		.then(rows => {
			const count = rows[0].count;
			return Promise.all([
				mysql.query(`
					SELECT
						data_center,
						country,
						COUNT(*) as count,
						AVG(perf_dns) as perf_dns_mean,
						STD(perf_dns) as perf_dns_std,
						AVG(perf_connect) as perf_connect_mean,
						STD(perf_connect) as perf_connect_std,
						AVG(perf_req) as perf_req_mean,
						STD(perf_req) as perf_req_std,
						AVG(perf_resp) as perf_resp_mean,
						STD(perf_resp) as perf_resp_std
					FROM requests WHERE ${daterange}
					GROUP BY data_center, country`
				),
				mysql.query('SELECT data_center, country, (SELECT perf_dns FROM requests r2 WHERE data_center=r1.data_center AND country=r1.country AND '+daterange+' ORDER BY perf_dns DESC LIMIT ?, 1) as perf_dns_95 FROM requests r1 WHERE '+daterange+' GROUP BY data_center, country', [Math.floor(count*0.05)]),
				mysql.query('SELECT data_center, country, (SELECT perf_dns FROM requests r2 WHERE data_center=r1.data_center AND country=r1.country AND '+daterange+' ORDER BY perf_dns DESC LIMIT ?, 1) as perf_dns_99 FROM requests r1 WHERE '+daterange+' GROUP BY data_center, country', [Math.floor(count*0.01)])
			]);
		})
		.then(results => {
			const makeKey = row => row.country + ' ' + row.data_center;
			const data = results.reduce((acc, resultset) => {
				resultset.forEach(row => {
					acc[makeKey(row)] = Object.assign({}, acc[makeKey(row)], row);
				});
				return acc;
			}, {});
			res.json(Object.keys(data).map(k => data[k]));
		})
	;
});

router.get('/v2/getRumCompatData', (req, res) => {

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');
	res.json("TODO");
	/*
	{
		"results": {
			"Array.prototype.forEach": {
				"ie": {
					"8": {
						"passCount": 3243,
						"failCount": 23
					}
				}
			}
		},
		"configDiff": {
			"add": [
				{featureName, uaFamily, uaVersion}
			],
			"remove": []
		}
	}
	*/
});

module.exports = router;
