var polyfillio = require('../lib'),
	express = require('express'),
	app = express(),
	packagejson = require('../package.json'),
	origamijson = require('../origami.json'),
	helpers = require('./helpers'),
	path = require('path'),
	parseArgs = require('minimist'),
	ServiceMetrics = require('./metrics');

'use strict';

var argv = parseArgs(process.argv.slice(2));

var port = argv.port || Number(process.env.PORT) || 3000,
	metrics = new ServiceMetrics();

// Default cache control policy
app.use(function(req, res, next) {
	res.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800');
	return next();
});


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
		"appVersion": packagejson.version,
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
        // TODO: This should match a service name in CMDB
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
})

app.get("/v1", function(req, res) {
	res.redirect('/v1/');
})


app.get("/v1/", function(req, res) {
	res.sendfile(path.join(__dirname, '/../docs/index.html'));
})
app.use('/assets', express.static(__dirname + '/../docs/assets'));



/* API endpoints */


app.get(/^\/v1\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	var responseStartTime = Date.now();

	var firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		fileExtension = minified ? req.params[1].toLowerCase() : firstParameter,
		isGateForced = req.query.gated === "1",
		polyfills   = helpers.parseRequestedPolyfills(req.query.features || '', isGateForced ? ["gated"] : []),
		uaString = req.query.ua || req.header('user-agent');

	var polyfill = polyfillio.getPolyfills({
		polyfills: polyfills,
		extension: fileExtension,
		minify: minified,
		uaString: uaString,
		url: req.originalUrl
	});

	if (fileExtension === '.js') {
		res.set('Content-Type', 'application/javascript;charset=utf-8');
	} else {
		res.set('Content-Type', 'text/css;charset=utf-8');
	}

	res.set('Vary', 'User-Agent');
	res.set('Access-Control-Allow-Origin', '*');
	res.send(polyfill);
	metrics.addResponseTime(Date.now() - responseStartTime);
	metrics.addResponseType(fileExtension);
});

app.listen(port);
console.log("Server listening on port: ", port);
