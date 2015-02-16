var Graphite = require('graphite');
var Measured = require('measured');

var reportInterval = 5000;
var graphiteHost = process.env.GRAPHITE_HOST || null;
var graphitePort = process.env.GRAPHITE_PORT || 2003;
var envName = process.env.ENV_NAME || "unknown";

var timer = null;
var graphite = null;
var data = Measured.createCollection('polyfill.' + envName);

if (graphiteHost) {
	graphite = Graphite.createClient('plaintext://'+graphiteHost+':'+graphitePort);
	timer = setInterval(function() {
		graphite.write(data.toJSON(), function(err) {
			if (err) {
				console.error(err);
			}
		});
	}, reportInterval);
	timer.unref();
}

module.exports = data;
