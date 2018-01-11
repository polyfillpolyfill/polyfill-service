'use strict';

const express = require('express');
const path = require('path');
const Raven = require('raven');
const morgan = require('morgan');
const shrinkRay = require('./shrink-ray');

const app = express().enable("strict routing");
const one_day = 60 * 60 * 24;
const one_week = one_day * 7;
const one_year = one_day * 365;

app.use(shrinkRay({
  brotli: {quality: 11}
}));

let ravenClient;

// Log requests
if (process.env.ENABLE_ACCESS_LOG) {
	app.use(morgan('method=:method path=":url" request_id=:req[X-Request-ID] status=:status service=:response-time bytes=:res[content-length]'));
}

process.on('uncaughtException', (err) => {
  console.log('Caught exception', err);
});

// Set up Sentry (getsentry.com) to collect JS errors.
if (process.env.SENTRY_DSN) {
	const about = require(path.join(__dirname, '../about.json'));
	ravenClient = new Raven.Client(process.env.SENTRY_DSN, {
		release: about.appVersion || process.env.SENTRY_RELEASE || 'unknown'
	});
	ravenClient.patchGlobal();
	app.use(Raven.middleware.express.requestHandler(ravenClient));
}

// Do not send the X-Powered-By header.
app.disable("x-powered-by");

// Default response headers
app.use((req, res, next) => {

	// Ensure our site is only served over TLS and reduce the chances of someone performing a MITM attack.
	res.set('Strict-Transport-Security', `max-age=${one_year}; includeSubdomains; preload`);

	// Enables the cross-site scripting filter built into most modern web browsers.
	res.set('X-XSS-Protection', `1; mode=block`);

	// Prevents MIME-sniffing a response away from the declared content type.
	res.set('X-Content-Type-Options', `nosniff`);

	// Prevents clickjacking by prohibiting our site from being included on other domains in an iframe.
	res.set('X-Frame-Options', `sameorigin`);

	res.set('Cache-Control', 'public, s-maxage=' + one_year + ', max-age=' + one_week + ', stale-while-revalidate=' + one_week + ', stale-if-error=' + one_week);
	res.set('Surrogate-Key', process.env.SURROGATE_KEY || 'polyfill-service');
	res.set('Timing-Allow-Origin', '*');
	return next();
});


/* Routes */

app.use(require('./routes/api.js'));
app.use(require('./routes/meta.js'));
app.use('/test', require('./routes/test.js'));

if (process.env.RUM_MYSQL_DSN) {
	app.use(require('./routes/rum.js'));
}

app.get(/^(?:\/(?:docs\/?(?:(.+)\/?)?)?)?$/, require('./routes/docs'));
app.get(/^\/(?:v([12])(?:\/(?:docs\/?(?:(.+)\/?)?)?)?)?$/, require('./routes/docs'));
app.use(/^\/v[12]\/assets/, express.static(__dirname + '/../docs/assets'));


if (process.env.SENTRY_DSN) {
	app.use(Raven.middleware.express.errorHandler(ravenClient));
}


function startService(port, callback) {
	callback = callback || function() {};

	app.server = app
		.listen(port, function (err) {
			callback(err, app);
		})
		.on('error', function (err) {
			callback(err);
		})
		.on('clientError', function (ex, sock) {
			sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
			sock.destroy();
		})
	;
}

module.exports = startService;
