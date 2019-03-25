/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;
const querystring = require("querystring");
const _ = require("lodash");
const polyfillio = require("polyfill-library");
process.env.NODE_ENV = "production";
const browserslist = require("browserslist");

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
	const qs = querystring.stringify({
		features: polyfillBundleOptions.join(","),
		ua
	});
	const path = `/v3/polyfill.js?${qs}`;
	context(host + path, function() {
		this.timeout(30000);
		it("responds with a correct polyfill bundle", async () => {
			const polyfillBundle = await polyfillio.getPolyfillString({
				minify: false,
				uaString: ua,
				features: arrayToObject(polyfillBundleOptions)
			});
			return request(host)
				.get(path)
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
	const browsers = browserslist("last 80 versions").reduce((accumulator, browser) => {
		if (browser.includes("-")) {
			return accumulator;
		}
		browser = browser.replace(" ", "/");
		if (browser.startsWith("edge")) {
			return accumulator.concat([browser, browser.replace("edge", "edge_mob")]);
		} else if (browser.startsWith("firefox")) {
			return accumulator.concat([browser, browser.replace("firefox", "firefox_mob")]);
		} else if (browser.startsWith("samsung")) {
			return accumulator.concat(browser.replace("samsung", "samsung_mob"));
		} else {
			return accumulator.concat(browser);
		}
	}, []);
	const polyfills = (await polyfillio.listAllPolyfills()).filter(feature => !feature.startsWith("_"));
	const polyfillsWithoutIntl = polyfills.filter(feature => !feature.startsWith("Intl"));
	const aliases = Object.keys(await polyfillio.listAliases()).filter(alias => !alias.startsWith("modernizr") && !alias.startsWith("caniuse"));
	const intlPolyfills = polyfills.filter(feature => feature.startsWith("Intl"));
	const polyfillsWithOnlyOneIntlLocale = polyfillsWithoutIntl.concat(_.sample(intlPolyfills));
	const features = [].concat(polyfillsWithOnlyOneIntlLocale, aliases);
	describe("test combinations of polyfills/aliases", function() {
		for (const polyfillBundleOptions of take(1024, sample(10, loop(Infinity, features)))) {
			const ua = _.sample(browsers);
			createTest(polyfillBundleOptions.sort(), ua);
		}
	});
	run();
}

tests();
