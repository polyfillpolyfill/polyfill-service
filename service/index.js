var polyfillio = require('../lib'),
	express = require('express'),
	app = express(),
	packagejson = require('../package.json'),
	origamijson = require('../origami.json'),
	helpers = require('./helpers');

'use strict';

var aliasResolver = AliasResolver.createDefault(polyfillio.aliases),
	port = 3000;


/* Endpoints for health, application metadata and availability status
 * compliant with FT Origami standard
 * http://origami.ft.com/docs/syntax/web-service-index/ */

// Describe the available
app.get(/^\/__about$/, function(req, res) {
	var info = {
		"name": "polyfill-service",
		"versions": [
			"/v1/"
		]
	};
	res.set("Content-Type", "application/json");
	res.send(JSON.stringify(info));
});


app.get(/^\/v1\/__about$/, function(req, res) {
	var info = {
		"name": "polyfill-service",
		"apiVersion": 1,
		"appVersion": packagejson.version,
		"dateCreated": '2014-07-14T10:28:45Z',
		"support": origamijson.support,
		"supportStatus": "active"
	};

	res.set("Content-Type", "application/json");
	res.send(JSON.stringify(info));
});

app.get(/^\/__gtg$/, function(req, res) {
	res.set("Content-Type", "text/plain");
	res.set("Cache-Control", "no-store");
	res.send("OK");
});

app.get(/^\/__health$/, function(req, res) {
    var info = {
        "schemaVersion": 1,
        // TODO: This should match a service name in CMDB
        "name": "polyfill-service",
        "description": "Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent.  More at http://github.com/Financial-Times/polyfill-service.",
        "checks": [
            {
                "name": "Server is up",
                "ok": "true",
                "severity": 2,
                "businessImpact": "Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.",
                "technicalSummary": "Tests that the Node JS process is up.",
                "panicGuide": "This application consists of Node JS processes on any number of nodes in an environment.  The process must have read permissions on files within its deployment.",
                "checkOutput": "None",
                "lastUpdated": new Date().toISOString()
            }
        ],
    };

    res.set('Cache-Control', 'no-store');
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(info));
});

app.get("/", function(req, res) {
	res.redirect('/v1/');
})


app.get("/v1/", function(req, res) {
	res.sendfile('docs/index.html');
})

app.get(/^\/v1\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {

	var firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		fileExtension = minified ? req.params[1].toLowerCase() : firstParameter,
		isGateForced = req.query.gated === "1",
		polyfills   = helpers.parseRequestedPolyfills(req.query.features || '', isGateForced ? ["gated"] : []);

	var polyfill = polyfillio.getPolyfills({
		polyfills: polyfills,
		extension: fileExtension,
		minify: minified,
		uaString: req.header('user-agent'),
		url: req.originalUrl
	});

	if (fileExtension === '.js') {
		res.set('Content-Type', 'application/javascript');
	} else {
		res.set('Conent-Type', 'text/css');
	}

	res.set('Vary', 'User-Agent');
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Cache-Control', 'public, max-age=86400');
	res.send(polyfill);
});


app.listen(port);
