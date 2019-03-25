/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("../helpers").host;
const querystring = require("querystring");
const _ = require("lodash");
const polyfillio = require("polyfill-library");
process.env.NODE_ENV = "production";
// const polyfillio_3_27_4 = require("polyfill-library-3.27.4");
// const polyfillio_3_25_3 = require("polyfill-library-3.25.3");
// const polyfillio_3_25_1 = require("polyfill-library-3.25.1");

function* subsets(array, offset = 0) {
	while (offset < array.length) {
		const first = array[offset++];
		for (const subset of subsets(array, offset)) {
			subset.push(first);
			yield subset;
		}
	}
	yield [];
}

function createTest(polyfillBundleOptions, polyfillBundle) {
	describe("test all combinations of polyfills/aliases", function() {
		context(polyfillBundleOptions, function() {
			this.timeout(30000);
			it("responds with a correct status, content-type, cache-control, surrogate-key", () => {
				return request(host)
					.get(polyfillBundleOptions)
					.set("Fastly-Debug", "true")
					.expect(200)
					.expect("Content-Type", "text/javascript; charset=utf-8")
					.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
					.expect("surrogate-key", "polyfill-service")
					.then(response => {
						assert.isString(response.text);
						assert.include(response.text, polyfillBundle);
						assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
					});
			});
		});
	});
}

function sample(collection, amount = 10) {
	return _.sampleSize(collection, amount);
}

function arrayToObject(arr) {
	return arr.reduce(function(accumulator, item) {
		accumulator[item] = {};
		return accumulator;
	}, {});
}
async function tests() {
	// const useragents = Object.keys(require("@financial-times/polyfill-useragent-normaliser/data.json").baselineVersions);
	const polyfills = (await polyfillio.listAllPolyfills()).filter(feature => !feature.startsWith("_"));
	const polyfillsWithoutIntl = polyfills.filter(feature => !feature.startsWith("Intl"));
	// const aliases = Object.keys(await polyfillio.listAliases()).filter(alias => !alias.startsWith("modernizr") && !alias.startsWith("caniuse"));
	// const intlPolyfills = polyfills.filter(feature => feature.startsWith("Intl"));
	const features = [].concat(sample(polyfillsWithoutIntl));
	const ua = "ie/10";
	for (const subset of subsets(features)) {
		const polyfillBundle = await polyfillio.getPolyfillString({
			minify: false,
			uaString: ua,
			features: arrayToObject(subset.length === 0 ? ["default"] : subset.sort())
		});
		const qs = querystring.stringify({
			features: subset.join(","),
			ua
		});
		const polyfillBundleOptions = `/v3/polyfill.js?${qs}`;
		createTest(polyfillBundleOptions, polyfillBundle);
	}
	run();
}

tests();
