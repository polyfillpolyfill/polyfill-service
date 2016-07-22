'use strict';

const express = require('express');
const path = require('path');
const Raven = require('raven');
const morgan = require('morgan');

const app = express().enable("strict routing");
const one_day = 60 * 60 * 24;
const one_week = one_day * 7;
const one_year = one_day * 365;

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
		release: about.appVersion || 'unknown'
	});
	ravenClient.patchGlobal();
	app.use(Raven.middleware.express.requestHandler(ravenClient));
}

// Default response headers
app.use((req, res, next) => {
	res.set('Strict-Transport-Security', `max-age=${one_year}`);
	res.set('Cache-Control', 'public, max-age='+one_week+', stale-while-revalidate='+one_week+', stale-if-error='+one_week);
	res.set('Timing-Allow-Origin', '*');
	res.removeHeader("x-powered-by");
	return next();
});


/* Routes */

app.use(require('./routes/api.js'));
app.use(require('./routes/meta.js'));
app.use(require('./routes/rum.js'));
app.use('/test', require('./routes/test.js'));

app.get(/^\/(?:v([12])(?:\/(?:docs\/?(?:(.+)\/?)?)?)?)?$/, require('./routes/docs'));
app.use(/^\/v[12]\/assets/, express.static(__dirname + '/../docs/assets'));


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
			sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
			sock.destroy();
		})
	;
}

module.exports = startService;
