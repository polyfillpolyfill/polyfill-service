/* Endpoints for health, application metadata and availability status */

'use strict';

const express = require('express');
const path = require('path');

const router = express.Router(); // eslint-disable-line new-cap

const serviceInfo = Object.assign({}, require('../../about.json'), {
	appVersion: require('../../package.json').version,
	hostname: require("os").hostname(),
	dateDeployed: require('graceful-fs').statSync(path.join(__dirname,'../../package.json')).mtime
});

// Allow robots to index the site, including polyfill bundles,
// as some sites need polyfills in order to be indexable!
router.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow:");
});

// Service description metadata
router.get('/__about', (req, res) => {
	res.type("application/json;charset=utf-8");
	res.json(serviceInfo);
});

// "Good to go" endpoint
router.get('/__gtg', (req, res) => {
	res.type("text/plain;charset=utf-8");
	res.set("Cache-Control", "no-cache");
	res.send("OK");
});

// Healthcheck
router.get('/__health', (req, res) => {
	const info = {
		"schemaVersion": 1,
		"name": "polyfill-service",
		"description": "Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent.  More at http://github.com/Financial-Times/polyfill-service.",
		"checks": [
			{
				"name": "Server is up",
				"ok": true,
				"severity": 2,
				"businessImpact": "Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.",
				"technicalSummary": "Tests that the Node JS process is up.",
				"panicGuide": "This application consists of Node JS processes on any number of nodes in an environment.  The process must have read permissions on files within its deployment.",
				"checkOutput": "None",
				"lastUpdated": new Date().toISOString()
			}
		],
	};

	res.set('Cache-Control', 'no-cache');
	res.type('application/json;charset=utf-8');
	res.json(info);
});

module.exports = router;
