"use strict";

const HealthCheck = require("@financial-times/health-check");

module.exports = healthChecks;

function healthChecks(options) {
	// Create and return the health check
	return new HealthCheck({
		checks: [
			// This check ensures that Origami repo data is available.
			// It will fail on a non-200 response
			{
				type: "ping-url",
				// TODO Make this use the domain that the service is deployed to.
				url: "https://cdn.polyfill.io/__gtg",
				interval: 60000,
				id: "repo-data",
				name: "Information can be retrieved from the Origami Repo Data service",
				severity: 2,
				businessImpact: "Users may not be able to view certain registry pages",
				technicalSummary: "Hits the given url and checks that it responds successfully",
				panicGuide: "Check https://cdn.polyfill.io/__health"
			},

			// This check monitors the process memory usage
			// It will fail if usage is above the threshold
			{
				type: "memory",
				threshold: 75,
				interval: 15000,
				id: "system-memory",
				name: "System memory usage is below 75%",
				severity: 1,
				businessImpact: "Application may not be able to serve all requests",
				technicalSummary: "Process has run out of available memory",
				panicGuide: "Restart the service dynos on Heroku"
			},

			// This check monitors the system CPU usage
			// It will fail if usage is above the threshold
			{
				type: "cpu",
				threshold: 125,
				interval: 15000,
				id: "system-load",
				name: "System CPU usage is below 125%",
				severity: 1,
				businessImpact: "Application may not be able to serve all requests",
				technicalSummary: "Process is hitting the CPU harder than expected",
				panicGuide: "Restart the service dynos on Heroku"
			}
		],
		log: options.log
	});
}
