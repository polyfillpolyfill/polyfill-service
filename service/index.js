var polyfillio = require('../lib'),
	express = require('express'),
	app = express().enable("strict routing"),
	packagejson = require('../package.json'),
	origamijson = require('../origami.json'),
	PolyfillSet = require('./PolyfillSet'),
	path = require('path'),
	fs = require('fs'),
	parseArgs = require('minimist'),
	ServiceMetrics = require('./metrics'),
	fs = require('fs'),
	testing = require('./testing'),
	appVersion = fs.existsSync('./.semver') ? fs.readFileSync('./.semver', {encoding:'UTF-8'}).replace(/\s+$/, '') : 'Unknown';

'use strict';

var argv = parseArgs(process.argv.slice(2));

var port = argv.port || Number(process.env.PORT) || 3000,
	metrics = new ServiceMetrics(),
	contentTypes = {".js": 'application/javascript', ".css": 'text/css'};

var one_day = 60 * 60 * 24;
var one_week = one_day * 7;
var one_year = one_day * 365;

// Default cache control policy
app.use(function(req, res, next) {
	res.set('Cache-Control', 'public, max-age='+one_day+', stale-while-revalidate='+one_week+', stale-if-error='+one_week);
	return next();
});


/* Tests */

app.use('/test/libs/mocha', express.static(path.join(__dirname, '/../node_modules/mocha')));
app.use('/test/libs/expect', express.static(path.join(__dirname, '/../node_modules/expect.js/')));

app.get(/\/test\/director\/?$/, testing.createEndpoint('director', polyfillio));
app.get(/\/test\/tests\/?$/, testing.createEndpoint('runner', polyfillio));


/* Endpoints for health, application metadata and availability status
 * compliant with FT Origami standard
 * http://origami.ft.com/docs/syntax/web-service-index/ */

// Describe the available API versions
app.get(/^\/__about$/, function(req, res) {
	var info = {
		"name": "polyfill-service",
		"versions": [
			"/v1/"
		]
	};
	res.set("Content-Type", "application/json;charset=utf-8");
	res.send(JSON.stringify(info));
});

// Describe the active API version
app.get(/^\/v1\/__about$/, function(req, res) {
	var info = {
		"name": "polyfill-service",
		"apiVersion": 1,
		"appVersion": appVersion,
		"dateCreated": '2014-07-14T10:28:45Z',
		"support": origamijson.support,
		"supportStatus": "active"
	};

	res.set("Content-Type", "application/json;charset=utf-8");
	res.send(JSON.stringify(info));
});

// "Good to go" endpoint
app.get(/^\/__gtg$/, function(req, res) {
	res.set("Content-Type", "text/plain;charset=utf-8");
	res.set("Cache-Control", "no-cache");
	res.send("OK");
});

// Healthcheck
app.get(/^\/__health$/, function(req, res) {
    var info = {
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
    res.set('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify(info));
});

app.get(/^\/__metrics$/, function(req, res) {
	var info = {
		"schemaVersion": 1,
		"metrics": {
			"responsetime": metrics.getResponseTimeMetric(),
			"uptime": metrics.getUptimeMetric(),
			"servedjsresponsecount": metrics.getJavascriptResponseCountMetric(),
			"servedcssresponsecount": metrics.getCSSResponseCountMetric()
		}
	};

	res.set("Cache-Control", "no-cache");
	res.set("Content-Type", "application/json;charset=utf-8");
	res.send(JSON.stringify(info));
});



/* Documentation and version routing */

app.get("/", function(req, res) {
	res.redirect('/v1/');
});

app.get("/v1", function(req, res) {
	res.redirect('/v1/');
});

app.get("/v1/", function(req, res) {
	res.sendfile(path.join(__dirname, '/../docs/index.html'));
});

app.use('/assets', express.static(__dirname + '/../docs/assets'));



/* API endpoints */

app.get(/^\/v1\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	var responseStartTime = Date.now();

	var firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		fileExtension = minified ? req.params[1].toLowerCase() : firstParameter,
		uaString = req.query.ua || req.header('user-agent'),
		flags = req.query.flags ? req.query.flags.split(',') : [];

	// Backwards compatibility
	if (req.query.gated) flags.push('gated');

	var polyfills = PolyfillSet.fromQueryParam(req.query.features || 'default', flags);

	if (!req.query.ua) res.set('Vary', 'User-Agent');

	if (!uaString) {
		res.status(400);
		res.send('A user agent identifier is required, either via a User-Agent header or the ua query param.');

	} else {
		res.set('Content-Type', contentTypes[fileExtension]+';charset=utf-8');
		res.set('Access-Control-Allow-Origin', '*');
		res.send(polyfillio.getPolyfillString({
			features: polyfills.get(),
			extension: fileExtension,
			minify: minified,
			uaString: uaString,
			url: req.originalUrl
		}));
		metrics.addResponseTime(Date.now() - responseStartTime);
		metrics.addResponseType(fileExtension);
	}
});

app.get("/v1/normalizeUa", function(req, res, next) {

	if (req.query.ua) {
		res.status(200);
		res.set('Cache-Control', 'public, max-age='+one_year+', stale-if-error='+(one_year+one_week));
		res.set('Normalized-User-Agent', encodeURIComponent(polyfillio.normalizeUserAgent(req.query.ua)));
		res.send();
	} else {
		res.status(400);
		res.send('ua query param required');
	}
});

app.listen(port);
console.log("Server listening on port: ", port);
