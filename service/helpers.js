/** Any Helper functions specific to the service reside here.
 */

function ServiceMetrics() {

	this.serviceStartTime = Date.now();

	// Number of responses served since up
	this.responseCount = 0;

	// The cumulative moving average response time in milliseconds since up
	this.averageResponseTime = 0;

	// The minimum and maximum response times since up
	this.minResponseTime = Number.POSITIVE_INFINITY;
	this.maxResponseTime = Number.NEGATIVE_INFINITY;

	// The last time the response average was updated (null represents never
	// in this case)
	this.lastResponseAverageUpdate = null;
}

ServiceMetrics.prototype.addResponseTime = function(timeInMilliSecs) {
	var newaverage = timeInMilliSecs + (this.averageResponseTime * this.responseCount) / (this.responseCount + 1);

	if (timeInMilliSecs < this.minResponseTime) {
		this.minResponseTime = timeInMilliSecs;
	}

	if (timeInMilliSecs > this.maxResponseTime) {
		this.maxResponseTime = timeInMilliSecs;
	}

	this.averageResponseTime = newaverage;
	this.responseCount++;
};

ServiceMetrics.prototype.getResponseTimeMetric = function() {
	return {
		"type": "movingaverage",
		"description": "Average application response time",
		"since": new Date(this.serviceStartTime).toISOString(),
		"period": Math.floor((Date.now() - this.serviceStartTime) / 1000),
		"mean": this.averageResponseTime,
		"min": this.minResponseTime,
		"max": this.maxResponseTime,
		"lastUpdate": this.lastResponseAverageUpdate == null ? null : new Date(this.lastResponseAverageUpdate).toISOString(),
		"unit": "milliseconds"
	};
};

ServiceMetrics.prototype.getUptimeMetric = function() {
	return {
		"type": "counter",
		"description": "The time since the Node JS process was last restarted",
		"val": Math.floor((Date.now() - this.serviceStartTime) / 1000),
		"unit": "seconds",
		"since": new Date(this.serviceStartTime).toISOString(),
		"lastUpdated": new Date().toISOString()
	};
};

module.exports = {
	parseRequestedPolyfills: function(polyfillList, additionalFlags) {
		var list = polyfillList.split(',').filter(function(x) { return x.length; });
		additionalFlags = additionalFlags || [];

		return list.map(function parsePolyfillInfo(name) {
			var nameAndFlags = name.split('|');
			return {
				flags:   nameAndFlags.slice(1).concat(additionalFlags),
				name:    nameAndFlags[0],
				aliasOf: nameAndFlags[0]
			};
		});
	},
	ServiceMetrics: ServiceMetrics
};
