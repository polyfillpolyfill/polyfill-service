/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;
const querystring = require("querystring");
const _ = require("lodash");
const polyfillio = require("polyfill-library");
process.env.NODE_ENV = "production";
// const polyfillio_3_27_4 = require("polyfill-library-3.27.4");
// const polyfillio_3_25_3 = require("polyfill-library-3.25.3");
// const polyfillio_3_25_1 = require("polyfill-library-3.25.1");

function* mapWith(fn, iterable) {
	for (const element of iterable) {
		yield fn(element);
	}
}

const sample = (amount, iterable) => mapWith(element => _.sampleSize(element, amount), iterable);

function* take(n, iter) {
	let index = 0;
	for (const val of iter) {
		if (index >= n) {
			return;
		}
		index = index + 1;
		yield val;
	}
}

function* loop(amount, thing) {
	while (amount > 0) {
		yield thing;
		amount--;
	}
}

function createTest(polyfillBundleOptions, polyfillBundle) {
	describe("test all combinations of polyfills/aliases", function() {
		context(host + polyfillBundleOptions, function() {
			this.timeout(30000);
			it("responds with a correct polyfill bundle", () => {
				return request(host)
					.get(polyfillBundleOptions)
					.expect(polyfillBundle);
			});
		});
	});
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
	const aliases = Object.keys(await polyfillio.listAliases()).filter(alias => !alias.startsWith("modernizr") && !alias.startsWith("caniuse"));
	const intlPolyfills = polyfills.filter(feature => feature.startsWith("Intl"));
	const polyfillsWithOnlyOneIntlLocale = polyfillsWithoutIntl.concat(_.sample(intlPolyfills));
	const features = [].concat(polyfillsWithOnlyOneIntlLocale, aliases);
	const ua = "ie/10";
	for (const subset of take(15, sample(10, loop(Infinity, features)))) {
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
