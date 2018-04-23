/* Endpoints for Real User Monitoring of detect and perf results */

'use strict';

const express = require('express');
const RumReport = require('../RumReport');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/v2/getRumPerfData', (req, res) => {

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');

	(new RumReport.Perf(req.query))
		.getStats()
		.then(toCSV.bind(null, req.query.header))
		.then(res.end.bind(res))
	;
});

router.get('/v2/getRumCompatData', (req, res) => {

	res.set('Cache-Control', 'no-cache, stale-while-revalidate=86400');

	(new RumReport.Compat())
		.getStats()
		.then(toCSV.bind(null, req.query.header))
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
