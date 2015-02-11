var Graphite = require('graphite');
var _ = require('lodash');

var Metrics = function(options) {
	this.options = _.extend({
		url: null,
		minInterval: 5000,
		prefix: ''
	}, options);
	this.timer = null;
	this.data = {counters:{}}
	if (options.url) this.graphite = Graphite.createClient(options.url);
};

Metrics.prototype.increment = function(key, amount) {
	this.data.counters[key] = (this.data.counters[key] || 0) + (amount || 1);
	this.send();
};

Metrics.prototype.send = function() {
	var dosend = function() {
		var data = Object.keys(this.data.counters).reduce(function(ret, key) {
			ret[this.options.prefix+key] = this.data.counters[key];
			return ret;
		}.bind(this), {});
		this.graphite.write(data, function(err) {
			if (err) {
				console.error(err);
			} else {
				console.log('Sent metrics');
			}
		});
	}.bind(this);

	if (!this.graphite) return;

	if (this.options.minInterval) {
		clearTimeout(this.timer);
		this.timer = setTimeout(dosend, this.options.minInterval);
	} else {
		dosend();
	}
};


module.exports = Metrics;
