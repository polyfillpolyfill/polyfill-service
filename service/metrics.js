/** Object to help with the recording of the service metrics. */
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

	// Response type metrics
	this.javascriptResponsesCount = 0;
	this.javascriptResponsesLastUpdated = null;


	this.cssResponsesCount = 0;
	this.cssResponsesLastUpdated = null;
}

/** Increment the counter for response type where type is '.js' or '.css' */
ServiceMetrics.prototype.addResponseType = function(type) {
	if (type === ".js") {
		this.javascriptResponsesCount++;
		this.javascriptResponsesLastUpdated = Date.now();
		return;
	}

	if (type === ".css") {
		this.cssResponsesCount++;
		this.cssResponsesLastUpdated = Date.now();
		return;
	}

	throw new Error("Invalid response file type: " + type);
};

ServiceMetrics.prototype.addResponseTime = function(timeInMilliSecs) {
	var newaverage = (timeInMilliSecs + (this.averageResponseTime * this.responseCount)) / (this.responseCount + 1);

	if (timeInMilliSecs < this.minResponseTime) {
		this.minResponseTime = timeInMilliSecs;
	}

	if (timeInMilliSecs > this.maxResponseTime) {
		this.maxResponseTime = timeInMilliSecs;
	}

	this.averageResponseTime = newaverage;
	this.responseCount++;
	this.lastResponseAverageUpdate = Date.now();
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

ServiceMetrics.prototype.getJavascriptResponseCountMetric = function() {
	return {
		"type": "counter",
		"description": "The number of Javascript polyfills served since last Node JS Process restart",
		"val": this.javascriptResponsesCount,
		"unit": "items",
		"since": new Date(this.serviceStartTime).toISOString(),
		"lastUpdated": new Date(this.javascriptResponsesLastUpdated).toISOString()
	};
};

ServiceMetrics.prototype.getCSSResponseCountMetric = function() {
	return {
		"type": "counter",
		"description": "The number of CSS polyfills served since last Node JS Process restart",
		"val": this.cssResponsesCount,
		"unit": "items",
		"since": new Date(this.serviceStartTime).toISOString(),
		"lastUpdated": new Date(this.cssResponsesLastUpdated).toISOString()
	};
};

module.exports = ServiceMetrics;
