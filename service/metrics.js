var Graphite = require('graphite');
var Measured = require('measured');
var blocked = require('blocked');

var reportInterval = 5000;
var graphiteHost = process.env.GRAPHITE_HOST || null;
var graphitePort = process.env.GRAPHITE_PORT || 2003;
var envName = process.env.NODE_ENV || "unknown";
var processIdentifier = process.env.DYNO ? 'dyno-' + process.env.DYNO.replace('.', '') : 'pid-' + process.pid;
var metricsNS = process.env.GRAPHITE_NS || 'origami.polyfill';

var timer = null;
var graphite = null;
var data = Measured.createCollection(metricsNS + '.' + envName + '.' + processIdentifier);

var failures = data.counter('graphiteReportingFailures');

blocked(function(ms) {
	if (ms < 100) return;
	console.warn('Event loop blocked for '+ms+'ms');
	data.counter('eventloop.blocks').inc();
	data.counter('eventloop.delay').inc(ms);
});

if (graphiteHost) {

	data.gauge('memory', function() {
		return process.memoryUsage().rss;
	});

	graphite = Graphite.createClient('plaintext://'+graphiteHost+':'+graphitePort);
	timer = setInterval(function() {
		graphite.write(data.toJSON(), function(err) {
			if (err) {

				// Ignore timeouts
				if (err.code === 'ETIMEDOUT' || err.code === 'EPIPE') {
					failures.inc();
					return;
				}

				console.error(err, err.stack);
				console.warn('Disabling graphite reporting due to error');
				clearInterval(timer);
			}
		});
	}, reportInterval);
	timer.unref();

	console.log('Initialised graphite metrics reporting to '+graphiteHost+', prefixed with '+metricsNS);
} else {
	console.warn('Graphite reporting is disabled.  To enable, set GRAPHITE_HOST');
}


module.exports = data;
