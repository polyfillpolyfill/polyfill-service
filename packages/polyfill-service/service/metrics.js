'use strict';

const Graphite = require('graphite');
const Measured = require('measured');
const blocked = require('blocked');

const reportInterval = 5000;
const graphiteHost = process.env.GRAPHITE_HOST || null;
const graphitePort = process.env.GRAPHITE_PORT || 2003;
const envName = process.env.NODE_ENV || "unknown";
const processIdentifier = process.env.DYNO ? 'dyno-' + process.env.DYNO.replace('.', '') : 'pid-' + process.pid;
const metricsNS = process.env.GRAPHITE_NS || 'origami.polyfill';

let reportTimer = null;
let graphite = null;
let data = null;

if (process.env.NODE_ENV !== 'ci') {
	data = Measured.createCollection(metricsNS + '.' + envName + '.' + processIdentifier);
	const failures = data.counter('graphiteReportingFailures');
	blocked(function (ms) {
		if (ms < 100) return;
		console.log('Event loop blocked for ' + ms + 'ms');
		data.counter('eventloop.blocks').inc();
		data.counter('eventloop.delay').inc(ms);
	});


	if (graphiteHost) {

		data.gauge('memory', () => process.memoryUsage().rss);

		graphite = Graphite.createClient('plaintext://' + graphiteHost + ':' + graphitePort);
		reportTimer = setInterval(() => {
			graphite.write(data.toJSON(), function (err) {
				if (err) {

					// Ignore timeouts
					if (err.code === 'ETIMEDOUT' || err.code === 'EPIPE') {
						failures.inc();
						return;
					}

					console.error(err, err.stack);
					console.warn('Disabling graphite reporting due to error');
					clearInterval(reportTimer);
				}
			});
		}, reportInterval);
		reportTimer.unref();

		console.log('Initialised graphite metrics reporting to ' + graphiteHost + ', prefixed with ' + metricsNS);
	} else {
		console.warn('Graphite reporting is disabled.  To enable, set GRAPHITE_HOST');

	}
}


module.exports = data;
