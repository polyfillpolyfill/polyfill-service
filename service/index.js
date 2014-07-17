var polyfillio = require('../lib'),
	express = require('express'),
	app = express(),
	packagejson = require('../package.json'),
	origamijson = require('../origami.json'),
	helpers = require('./helpers');

'use strict';

var aliasResolver = AliasResolver.createDefault(polyfillio.aliases),
	port = 3000;


/** Return information about the web service
 *  See Origami spec:
 *  	http://origami.ft.com/docs/syntax/web-service-index/
 */
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
