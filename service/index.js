var polyfillio = require('../lib');
var express = require('express');
var app = express().enable("strict routing");
var origamijson = require('../origami.json');
var PolyfillSet = require('./PolyfillSet');
var path = require('path');
var fs = require('fs');
var parseArgs = require('minimist');
var metrics = require('./metrics');
var fs = require('fs');
var testing = require('./testing');
var docs = require('./docs');
var appVersion = require('../package.json').version

'use strict';

var argv = parseArgs(process.argv.slice(2));
var port = argv.port || Number(process.env.PORT) || 3000;

metrics.gauge('memory', function() {
	return process.memoryUsage().rss;
});

var one_day = 60 * 60 * 24;
var one_week = one_day * 7;
var one_year = one_day * 365;
var contentTypes = {".js": 'application/javascript', ".css": 'text/css'};


// Default cache control policy
app.use(function(req, res, next) {
	res.set('Cache-Control', 'public, max-age=' + one_week);
	res.set('Timing-Allow-Origin', '*');
	res.removeHeader("x-powered-by");
	return next();
});


/* Tests */

app.use('/test/libs/mocha', express.static(path.join(__dirname, '/../node_modules/mocha')));
app.use('/test/libs/expect', express.static(path.join(__dirname, '/../node_modules/expect.js/')));

app.get(/\/test\/director\/?$/, testing.createEndpoint('director', polyfillio));
app.get(/\/test\/tests\/?$/, testing.createEndpoint('runner', polyfillio));

/* Documentation and version routing */

app.get(/^\/(?:v1(?:\/(?:docs\/?(?:([^\/]+)\/?)?)?)?)?$/, docs.route);
app.use('/v1/docs/assets', express.static(__dirname + '/../docs/assets'));



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


/* API endpoints */

app.get(/^\/v1\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	metrics.meter('hits').mark();
	var respTimeTimer = metrics.timer('respTime').start();

	var firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		fileExtension = minified ? req.params[1].toLowerCase() : firstParameter,
		uaString = req.query.ua || req.header('user-agent'),
		flags = req.query.flags ? req.query.flags.split(',') : [];

	// Backwards compatibility
	if (req.query.gated) {
		flags.push('gated');
	}

	// Currently don't support CSS
	if (fileExtension !== '.js') {
		res.status(404);
		res.set('Content-Type', 'text/plain;charset=utf-8');
		res.send('/* Type not supported.  Only .js is supported at the moment */');
		return;
	}

	var polyfills = PolyfillSet.fromQueryParam(req.query.features || 'default', flags);

	if (!req.query.ua) {
		res.set('Vary', 'User-Agent');
	}

	var params = {
		features: polyfills.get(),
		minify: minified
	};
	if (req.query.libVersion) {
		params.libVersion = req.query.libVersion;
	}
	if (req.query.unknown) {
		params.unknown = req.query.unknown;
	}
	if (uaString) {
		params.uaString = uaString;
		metrics.counter('useragentcount.'+polyfillio.normalizeUserAgent(uaString).replace(/^(.*?)\/(\d+)(\..*)?$/, '$1.$2')).inc();
	}

	var op = polyfillio.getPolyfillString(params);

	if (req.query.callback && req.query.callback.match(/^[\w\.]+$/)) {
		op += "\ntypeof "+req.query.callback+"==='function' && "+req.query.callback+"();";
	}
	res.set('Content-Type', contentTypes[fileExtension]+';charset=utf-8');
	res.set('Access-Control-Allow-Origin', '*');
	res.send(op);
	respTimeTimer.end();
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
