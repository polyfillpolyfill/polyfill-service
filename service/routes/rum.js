/* Endpoints for Real User Monitoring of detect and perf results */

'use strict';

const polyfillio = require('../../lib');
const metrics = require('../metrics');
const express = require('express');

let mysql;
require('promise-mysql').createConnection(process.env.MYSQL_DSN).then(conn => {
	mysql = conn;
})

const router = express.Router();  // eslint-disable-line new-cap
const blankGif = new Buffer([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b]);


/**
 * GET /v2/recordData
 *  - <featureName>: 1 if it passed the detect, else 0
 *  - dns: perf.domainLookupEnd - perf.domainLookupStart
 *  - connect: perf.connectEnd - perf.connectStart
 *  - req: perf.responseStart - perf.requestStart
 *  - resp: perf.responseEnd - perf.responseStart
 */
router.get('/v2/recordRumData', (req, res) => {

	res.set('Cache-Control', 'no-store');

	const logquery = 'INSERT INTO requests SET perf_dns=?, perf_connect=?, perf_req=?, perf_resp=?, ua_family=?, ua_version=?, lat=?, lng=?, country=?, data_center=?, refer_domain=?';
	const referer = (req.get('referer') || '').replace(/^(https?:\/\/)?(www\.)?(.+?)(\:\d+)?([\/\?].*)?$/, '$3');
	const ua = polyfillio.normalizeUserAgent(req.get('user-agent')).split('/');
	const logdata = [req.query.dns, req.query.connect, req.query.req, req.query.resp, ua[0], ua[1], req.get('geo-lat'), req.get('geo-lng'), req.get('geo-country'), req.get('data-center'), referer];

	if (mysql) {
		mysql.query(logquery, logdata)
			.then(result => {
				const reqid = result.insertId;
				return Promise.all(Object.keys(req.query).map(key => polyfillio.describePolyfill(key)))
					.then(features => {
						const dataquery = features
							.filter(f => f && f.name in req.query)
							.map(f => `(null, ${reqid}, ${mysql.escape(f.name)}, ${mysql.escape(req.query[f.name])})`)
							.join(', ')
						;
						return mysql.query('INSERT INTO detect_results (id, request_id, feature_name, result) VALUES ' + dataquery);
					})
				;
			})
		;
	}

	res.status(200);
	res.set('Content-type', 'image/gif');
	res.send(blankGif);
});

router.get('/v2/getRumPerfData', (req, res) => {
	const daterange = "req_time BETWEEN (CURDATE() - INTERVAL 7 DAY) AND CURDATE()";
	mysql.query('SELECT COUNT(*) as count FROM requests WHERE '+daterange).then(rows => {
		const count = rows[0].count;
		return Promise.all([
			mysql.query('SELECT COUNT(*) as count, data_center, country, AVG(perf_dns) as perf_dns_mean, STD(perf_dns) as perf_dns_std FROM requests WHERE '+daterange+' GROUP BY data_center, country'),
			mysql.query('SELECT data_center, country, (SELECT MAX(perf_dns) FROM requests r2 WHERE data_center=r1.data_center AND country=r1.country AND '+daterange+' ORDER BY perf_dns DESC LIMIT ?) as perf_dns_95 FROM requests r1 WHERE '+daterange+' GROUP BY data_center, country', [Math.floor(count*0.05)])
		]);
	})
	.then(results => {
		let data = {};
		results[0].forEach(row => {
			if (!(row.data_center in data)) data[row.data_center] = {};
			data[row.data_center][row.country] = row;
		});
		results[1].forEach(row => {
			data[row.data_center][row.country].perf_dns_95 = row.perf_dns_95;
		});
		res.json(data);
	})
});

router.get('/v2/getRumCompatData', (req, res) => {
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
