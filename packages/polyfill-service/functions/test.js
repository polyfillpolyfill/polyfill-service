/* Endpoints for running the test framework */

"use strict";

const Polyfillio = require("polyfill-library");
const polyfillio = new Polyfillio();
const fs = require("graceful-fs");
const path = require("path");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const handlebars = require("handlebars");
const directorTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, "/../test/browser/director.html.handlebars"), { encoding: "UTF-8" }));
const runnerTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, "/../test/browser/runner.html.handlebars"), { encoding: "UTF-8" }));
const Raven = require("raven");
const RavenLambdaWrapper = require("serverless-sentry-lib");

const sanitiseQueryParameters = (event = {}) => {
	const query = event.queryStringParameters || {};
	return {
		uaString: typeof query.ua === "string" && query.ua !== "" ? query.ua : event.headers ? event.headers["User-Agent"] : "",
		mode: typeof query.mode === "string" && query.mode !== "" ? query.mode : "targeted",
		feature: typeof query.feature === "string" ? query.feature : ""
	};
};

/**
 * Modes:
 *   control:  All features are allowed, tests served, no polyfills
 *   all:      All features are allowed, tests and polyfills both served
 *   targeted: Only targeted features are allowed, tests and polyfills both served
 */
function createEndpoint(template, polyfillio) {
	return async event => {
		const { feature, mode, uaString } = sanitiseQueryParameters(event);
		let featureListPromise;

		// Get the feature set for this test runner.  If in 'targeted' mode, allow filtering on UA, else force the feature to be included
		if (mode === "targeted") {
			featureListPromise = polyfillio.getPolyfills({ uaString, features: { all: { flags: [] } } }).then(set => Object.keys(set));
		} else {
			featureListPromise = polyfillio.listAllPolyfills();
		}

		// Filter for querystring args
		const featuresList = (await featureListPromise).filter(featureName => !feature || feature === featureName);

		// Fetch polyfill configs for all the features to be tested
		const polyfilldata = (await Promise.all(
			featuresList.map(featureName => {
				return polyfillio.describePolyfill(featureName).then(config => {
					if (config.isTestable && config.isPublic) {
						let testsPromise = Promise.resolve([]);
						if (config.hasTests) {
							const baseDir = path.resolve(require.resolve("polyfill-library"), "../../polyfills");
							const testFile = path.join(baseDir, config.baseDir, "/tests.js");
							testsPromise = readFile(testFile);
						}
						return testsPromise.then(tests => ({
							feature: featureName,
							detect: config.detectSource ? config.detectSource : false,
							tests
						}));
					}
				});
			})
		))
			.filter(obj => !!obj)
			.sort(function(a, b) {
				return a.feature > b.feature ? -1 : 1;
			});

		return {
			statusCode: 200,
			headers: {
				"Cache-Control": "no-store, private",
				"Content-Type": "text/html;charset=UTF-8",
				"Content-Security-Policy": "default-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; frame-ancestors 'self'; frame-src 'self' xkcd.com;"
			},
			body: template({
				loadPolyfill: mode !== "control",
				forceAlways: mode !== "targeted",
				features: polyfilldata,
				mode: mode
			})
		};
	};
}

module.exports.director = RavenLambdaWrapper.handler(Raven, createEndpoint(directorTemplate, polyfillio));

module.exports.tests = RavenLambdaWrapper.handler(Raven, createEndpoint(runnerTemplate, polyfillio));
