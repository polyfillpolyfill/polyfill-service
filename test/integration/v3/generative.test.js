/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;
const querystring = require("querystring");
const _ = require("lodash");
const polyfillio = require("polyfill-library");
// This is required because polyfill-library changes it's output dependent upon the value of NODE_ENV.
process.env.NODE_ENV = "production";
const browserslist = require("browserslist");

// The same as Array.prototype.map but for generators/iterators
// Applies the given function to each item in the iterable and yields the result.
// E.G. Array.from(mapWith(x=>x*2,[1,2,3])) -> [ 2, 4, 6 ]
function* mapWith(fn, iterable) {
	for (const element of iterable) {
		yield fn(element);
	}
}

// Takes an iterable of arrays and returns a random subset from each array.
// E.G.  Array.from(sample(2, [[1,2,3],[4,5,6],[7,8,9]])) -> [ [ 2, 1 ], [ 5, 6 ], [ 9, 7 ] ]
const sample = (amount, iterable) => mapWith(element => _.sampleSize(element, amount), iterable);

// Yield the first n items from the iterable.
function* take(n, iter) {
	let index = 0;
	for (const value of iter) {
		if (index >= n) {
			return;
		}
		index = index + 1;
		yield value;
	}
}
// Create an iterable that yields thing n times.
function* repeat(n, thing) {
	while (n > 0) {
		yield thing;
		n--;
	}
}

// Takes an array and converts it to an object,
// where the array items are property keys
// and the property values are empty objects
function arrayToObject(array) {
	return array.reduce(function(accumulator, item) {
		accumulator[item] = {};
		return accumulator;
	}, {});
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

// get browser names and versions which polyfill-service supports.
// browserslist does not have edge mobile or firefox mobile so we copy the versions from their desktop counterparts.
// polyfill-service named samsung browser "samsung_mob" and browserslist named it "samsung".
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

async function createFeaturesSet() {
	const polyfills = (await polyfillio.listAllPolyfills()).filter(feature => !feature.startsWith("_"));
	const polyfillsWithoutIntl = polyfills.filter(feature => !feature.startsWith("Intl"));
	const aliases = Object.keys(await polyfillio.listAliases()).filter(alias => !alias.startsWith("modernizr") && !alias.startsWith("caniuse"));
	const intlPolyfills = polyfills.filter(feature => feature.startsWith("Intl"));
	const polyfillsWithOnlyOneIntlLocale = polyfillsWithoutIntl.concat(_.sample(intlPolyfills));
	const features = [].concat(polyfillsWithOnlyOneIntlLocale, aliases);
	return features;
}

async function tests() {
	const features = await createFeaturesSet();

	describe("test combinations of polyfills/aliases", function() {
		// Create 1024 random sets of 10 features
		for (const polyfillBundleOptions of take(1024, sample(10, repeat(Infinity, features)))) {
			const ua = _.sample(browsers);
			createTest(polyfillBundleOptions.sort(), ua);
		}
	});

	// This is a global variable from mochajs which lets us tell mocha when we are ready to start running the tests.
	// mocha needs to be executed with the `--delay` flag in order for this global to exist.
	run();
}

tests();
