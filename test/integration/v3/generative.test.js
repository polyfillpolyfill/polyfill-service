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

function createTest(polyfillBundleOptions, ua) {
	context(host + polyfillBundleOptions, function() {
		this.timeout(30000);
		it("responds with a correct polyfill bundle", async () => {
			const polyfillBundle = await polyfillio.getPolyfillString({
				minify: false,
				uaString: ua,
				features: arrayToObject(polyfillBundleOptions)
			});
			const qs = querystring.stringify({
				features: polyfillBundleOptions.join(","),
				ua
			});
			return request(host)
				.get(`/v3/polyfill.js?${qs}`)
				.expect(polyfillBundle);
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
	const useragents = {
		edge: _.range(12, 18),
		edge_mob: _.range(12, 18),
		ie: _.range(8, 12),
		ie_mob: [11],
		chrome: _.range(29, 80),
		safari: _.range(9, 18),
		ios_saf: _.range(9, 18),
		ios_chr: _.range(9, 18),
		firefox: _.range(38, 80),
		firefox_mob: _.range(38, 80),
		android: _.range(4.3, 5.3, 0.1).map(num => _.round(num, 2)),
		opera: _.range(33, 80),
		op_mob: _.range(10, 80),
		op_mini: _.range(5, 80),
		bb: _.range(6, 11),
		samsung_mob: _.range(4.3, 10.3, 0.1).map(num => _.round(num, 2))
	};
	const polyfills = (await polyfillio.listAllPolyfills()).filter(feature => !feature.startsWith("_"));
	const polyfillsWithoutIntl = polyfills.filter(feature => !feature.startsWith("Intl"));
	const aliases = Object.keys(await polyfillio.listAliases()).filter(alias => !alias.startsWith("modernizr") && !alias.startsWith("caniuse"));
	const intlPolyfills = polyfills.filter(feature => feature.startsWith("Intl"));
	const polyfillsWithOnlyOneIntlLocale = polyfillsWithoutIntl.concat(_.sample(intlPolyfills));
	const features = [].concat(polyfillsWithOnlyOneIntlLocale, aliases);
	// const ua = "ie/10";
	describe("test combinations of polyfills/aliases", function() {
		for (const polyfillBundleOptions of take(1024, sample(10, loop(Infinity, features)))) {
			const ua = _.sample(useragents);
			const version = _.sample(useragents[ua]);
			createTest(polyfillBundleOptions.sort(), `${ua}/${version}`);
		}
	});
	run();
}

tests();
