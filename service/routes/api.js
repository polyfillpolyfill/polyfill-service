/* Main endpoints for the Polyfill service public API */

'use strict';

const polyfillio = require('../../lib');
const PolyfillSet = require('../PolyfillSet');
const metrics = require('../metrics');
const express = require('express');
const pump = require('pump');
const mergeStream = require('merge2');
const streamFromString = require('from2-string');

const router = express.Router(); // eslint-disable-line new-cap
const contentTypes = {".js": 'application/javascript', ".css": 'text/css'};
const one_day = 60 * 60 * 24;
const one_week = one_day * 7;
const one_year = one_day * 365;

router.get(/^\/v1\/(.*)/, (req, res) => {

	const qs = Object.keys(req.query).reduce((out, key) => {
		if (key !== 'libVersion' && key !== 'gated') {
			out.push(encodeURIComponent(key)+'='+encodeURIComponent(req.query[key]));
		}
		return out;
	}, []).join('&');
	const redirPath = '/v2/' + req.params[0].replace(/[^\w\/\.\+\:]/g, '') + (qs.length ? '?'+qs : '');

	res.status(301);
	res.set('Location', redirPath);
	res.set('Deprecation-Notice', 'API version 1 has been decommissioned - see the body of this response for more information.');
	res.send('API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output.');
});

router.get(/^\/v2\/polyfill(\.\w+)(\.\w+)?/, (req, res) => {
	let respTimeTimer;
	if (metrics) {
		metrics.counter('hits').inc();
		respTimeTimer = metrics.timer('respTime').start();
	}
	const firstParameter = req.params[0].toLowerCase();
	const minified = firstParameter === '.min';
	const fileExtension = req.params[1] ? req.params[1].toLowerCase() : firstParameter;
	const uaString = (typeof req.query.ua === 'string' && req.query.ua) || req.header('user-agent');
	const flags = (typeof req.query.flags === 'string') ? req.query.flags.split(',') : [];

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
		excludes: (typeof req.query.excludes === 'string' && req.query.excludes.split(',')) || [],
		minify: minified,
		rum: (Number.parseInt(req.query.rum, 10) === 1),
		stream: true
	};
	if (req.query.unknown) {
		params.unknown = (req.query.unknown === 'polyfill') ? 'polyfill' : 'ignore';
	}
	if (uaString) {
		params.uaString = uaString;
		if (metrics) {
			metrics.counter('useragentcount.' + polyfillio.normalizeUserAgent(uaString).replace(/^(.*?)\/(\d+)(\..*)?$/, '$1.$2')).inc();
		}
	}

	res.set('Content-Type', contentTypes[fileExtension]+';charset=utf-8');
	res.set('Access-Control-Allow-Origin', '*');

	const outputStream = mergeStream();

	outputStream.add(polyfillio.getPolyfillString(params));

	if (req.query.callback && typeof req.query.callback === 'string' && req.query.callback.match(/^[\w\.]+$/)) {
		outputStream.add(streamFromString("\ntypeof "+req.query.callback+"==='function' && "+req.query.callback+"();"));
	}

	pump(outputStream, res, (err) => {
		if (err) {
			console.error(err);
		}
		if (respTimeTimer) {
			respTimeTimer.end();
		}
	});
});

router.get("/v2/normalizeUa", (req, res) => {

	if (req.query.ua) {
		res.status(200);
		res.set('Cache-Control', 'public, max-age=' + one_year + ', stale-if-error=' + (one_year + one_week));
		res.set('Normalized-User-Agent', encodeURIComponent(polyfillio.normalizeUserAgent(req.query.ua)));
		res.send();
	} else {
		res.status(400);
		res.send('ua query param required');
	}
});

module.exports = router;
