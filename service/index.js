'use strict';

const polyfillio = require('../lib');
const express = require('express');
const app = express().enable("strict routing");
const PolyfillSet = require('./PolyfillSet');
const path = require('path');
const Raven = require('raven');
const metrics = require('./metrics');
const testing = require('./testing');
const docs = require('./docs');
const morgan = require('morgan');

const one_day = 60 * 60 * 24;
const one_week = one_day * 7;
const one_year = one_day * 365;
const contentTypes = {".js": 'application/javascript', ".css": 'text/css'};

const serviceInfo = Object.assign({}, require(path.join(__dirname, '../about.json')), {
	appVersion: require(path.join(__dirname,'../package.json')).version,
	hostname: require("os").hostname(),
	dateDeployed: require('fs').statSync(path.join(__dirname,'../package.json')).mtime
});

let ravenClient;


// Log requests
if (process.env.ENABLE_ACCESS_LOG) {
	app.use(morgan('method=:method path=":url" request_id=:req[X-Request-ID] status=:status service=:response-time bytes=:res[content-length]'));
}

// Set up Sentry (getsentry.com) to collect JS errors.
if (process.env.SENTRY_DSN) {
	ravenClient = new Raven.Client(process.env.SENTRY_DSN, {
		release: serviceInfo.appVersion
	});
	ravenClient.patchGlobal();
	app.use(Raven.middleware.express.requestHandler(ravenClient));
}

// Default response headers
app.use((req, res, next) => {
	res.set('Strict-Transport-Security', `max-age=${one_year}`)
	res.set('Cache-Control', 'public, max-age='+one_week+', stale-while-revalidate='+one_week+', stale-if-error='+one_week);
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

app.get(/^\/(?:v([12])(?:\/(?:docs\/?(?:(.+)\/?)?)?)?)?$/, docs.route);
app.use(/^\/v[12]\/assets/, express.static(__dirname + '/../docs/assets'));


/* Endpoints for health, application metadata and availability status
 * compliant with FT Origami standard
 * http://origami.ft.com/docs/syntax/web-service-description/ */

// Allow robots to index the site, including polyfill bundles as some sites need polyfills in order to be indexable!
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow:");
});

app.get(/^\/__about$/, (req, res) => {
	res.type("application/json;charset=utf-8");
	res.json(serviceInfo);
});

// "Good to go" endpoint
app.get(/^\/__gtg$/, (req, res) => {
	res.type("text/plain;charset=utf-8");
	res.set("Cache-Control", "no-cache");
	res.send("OK");
});

// Healthcheck
app.get(/^\/__health$/, (req, res) => {
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


/* API endpoints */

app.get(/^\/v1\/(.*)/, (req, res) => {

	const qs = Object.keys(req.query).reduce((out, key) => {
		if (key !== 'libVersion' && key !== 'gated') {
			out.push(key+'='+encodeURIComponent(req.query[key]));
		}
		return out;
	}, []).join('&');
	const redirPath = '/v2/' + req.params[0] + (qs.length ? '?'+qs : '');

	res.status(301);
	res.set('Location', redirPath);
	res.set('Deprecation-Notice', 'API version 1 has been decommissioned - see the body of this response for more information.');
	res.send('API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output.');
});

app.get(/^\/v2\/polyfill(\.\w+)(\.\w+)?/, (req, res) => {
	metrics.counter('hits').inc();
	const respTimeTimer = metrics.timer('respTime').start();
	const firstParameter = req.params[0].toLowerCase();
	const minified = firstParameter === '.min';
	const fileExtension = req.params[1] ? req.params[1].toLowerCase() : firstParameter;
	const uaString = (typeof req.query.ua === 'string' && req.query.ua) || req.header('user-agent');
	const flags = (typeof req.query.flags === 'string') ? req.query.flags.split(',') : [];
	const warnings = [];

	// Currently don't support CSS
	if (fileExtension !== '.js') {
		res.status(404);
		res.set('Content-Type', 'text/plain;charset=utf-8');
		res.send('/* Type not supported.  Only .js is supported at the moment */');
		return;
	}

	const polyfills = PolyfillSet.fromQueryParam(req.query.features, flags);

	// If inbound request did not specify UA on the query string, the cache key must use the HTTP header
	if (!req.query.ua) {
		res.set('Vary', 'User-Agent');
	}

	const params = {
		features: polyfills.get(),
		excludes: (req.query.excludes && req.query.excludes.split(',')) || [],
		minify: minified
	};
	if (req.query.unknown) {
		params.unknown = req.query.unknown;
	}
	if (uaString) {
		params.uaString = uaString;
		metrics.counter('useragentcount.'+polyfillio.normalizeUserAgent(uaString).replace(/^(.*?)\/(\d+)(\..*)?$/, '$1.$2')).inc();
	}

	polyfillio.getPolyfillString(params).then(op => {
		if (warnings.length) {
			op = '/* WARNINGS:\n\n- ' + warnings.join('\n- ') + '\n\n*/\n\n' + op;
		}
		if (req.query.callback && req.query.callback.match(/^[\w\.]+$/)) {
			op += "\ntypeof "+req.query.callback+"==='function' && "+req.query.callback+"();";
		}
		res.set('Content-Type', contentTypes[fileExtension]+';charset=utf-8');
		res.set('Access-Control-Allow-Origin', '*');
		res.send(op);
		respTimeTimer.end();
	});

});

app.get("/v2/normalizeUa", (req, res) => {

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

if (process.env.SENTRY_DSN) {
	app.use(Raven.middleware.express.errorHandler(ravenClient));
}


function startService(port, callback) {
	callback = callback || function() {};

	app
		.listen(port, function (err) {
			callback(err, app);
		})
		.on('error', function (err) {
			callback(err);
		})
		.on('clientError', function (ex, sock) {
			socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
			socket.destroy();
		})
	;
}

module.exports = startService;
