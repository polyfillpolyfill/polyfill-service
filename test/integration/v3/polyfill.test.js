/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const vm = require("vm");

const host = require("../helpers").host;

describe("OPTIONS /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.options("/v3/polyfill.js")
			.expect(200)
			.expect("Allow", "OPTIONS, GET, HEAD");
	});
});

describe("POST /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 405 status", () => {
		return request(host)
			.post("/v3/polyfill.js")
			.expect(405);
	});
});

describe("DELETE /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 405 status", () => {
		return request(host)
			.delete("/v3/polyfill.js")
			.expect(405);
	});
});

describe("PURGE /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 405 status", () => {
		return request(host)
			.purge("/v3/polyfill.js")
			.expect(405);
	});
});

describe("HEAD /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.head("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.expect(200)
			.expect("Content-Type", "text/javascript; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v3/polyfill.js", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.expect(200)
			.expect("Content-Type", "text/javascript; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
				assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
			});
	});
});

describe("GET /v3/polyfill.js?callback=AAA&callback=BBB", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/polyfill.js?callback=AAA&callback=BBB")
			.set("Fastly-Debug", "true")
			.expect(200)
			.expect("Content-Type", "text/javascript; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
				assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
			});
	});
});

describe("encoding", function() {
	this.timeout(30000);
	it("responds with no compression if client does not accept compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "identity")
			.expect("Vary", "Accept-Encoding")
			.expect("Vary", "User-Agent")
			.then(response => {
				assert.equal(response.headers["content-encoding"], undefined);
			});
	});

	it("responds with gzip compression if client accepts gzip compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "gzip")
			.expect("Vary", "Accept-Encoding")
			.expect("Vary", "User-Agent")
			.expect("Content-Encoding", "gzip");
	});

	it("responds with gzip compression if client accepts gzip and deflate compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "gzip, deflate")
			.expect("Vary", "Accept-Encoding")
			.expect("Vary", "User-Agent")
			.expect("Content-Encoding", "gzip");
	});

	it("responds with brotli compression if client accepts brotli compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "br")
			.expect("Vary", "Accept-Encoding")
			.expect("Vary", "User-Agent")
			.expect("Content-Encoding", "br");
	});

	it("responds with brotli compression if client accepts brotli and gzip compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "br, gzip")
			.expect("Vary", "Accept-Encoding")
			.expect("Vary", "User-Agent")
			.expect("Content-Encoding", "br");
	});
});

describe("GET /v3/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1")
			.set("Fastly-Debug", "true")
			.expect(200)
			.expect("Content-Type", "text/javascript; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service")
			.then(response => {
				assert.isString(response.text);
				// vm.Script will cause the event loop to become blocked whilst it parses the large response
				assert.doesNotThrow(() => new vm.Script(response.text));
				assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
			});
	});
});

describe("generative tests", async function() {
	const querystring = require("querystring");
	const PolyfillLibrary = require("polyfill-library");
	const secureRandom = require("secure-random-uniform");
	const polyfillLibrary = new PolyfillLibrary();
	const originalPolyfills = (await polyfillLibrary.listAllPolyfills()).filter(feature => !feature.startsWith("Intl")).filter(feature => !feature.startsWith("_ESAbstract"));

	for (let i = 0; i < 10; i++) {
		let polyfills = originalPolyfills.slice(0);
		const amountOfFeatures = Array(secureRandom(polyfills.length)).fill();

		const features = amountOfFeatures
			.map(() => {
				const polyfill = polyfills[secureRandom(polyfills.length)];
				// Including a feature more than once in `features` is the same as including it once, so our tests only include a feature once in `features`.
				polyfills = polyfills.filter(a => a !== polyfill);
				return polyfill;
			})
			.filter(Boolean)
			.join(",");
		const minify = [true, false][secureRandom(2)];
		const rum = [true, false];
		const unknown = ["polyfill", "ignore"];
		const version = [require("polyfill-library/package.json").version];
		const callback = [false, "Boolean"];
		// TODO: Expose this from the polyfill-library package
		const uaVersion = Array.from(Array(70).keys());
		const uaFamily = ["ie", "ie_mob", "chrome", "safari", "ios_saf", "ios_chr", "firefox", "firefox_mob", "android", "opera", "op_mob", "op_mini", "bb", "samsung_mob"];
		const ua = uaFamily[secureRandom(uaFamily.length)] + "/" + uaVersion[secureRandom(uaVersion.length)];
		const qs = querystring.stringify({
			rum: rum[secureRandom(rum.length)],
			unknown: unknown[secureRandom(unknown.length)],
			version: version[secureRandom(version.length)],
			callback: callback[secureRandom(callback.length)],
			ua,
			features
		});
		const url = `/v3/polyfill${minify ? ".min.js" : ".js"}?${qs}`;
		it(`GET ${host + url}`, async function() {
			this.timeout(30000);
			return request(host)
				.get(url)
				.then(response => {
					try {
						assert.equal(response.statusCode, 200);
						assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8");
						assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
						assert.isString(response.text);
						// vm.Script will cause the event loop to become blocked whilst it parses the large response
						assert.doesNotThrow(() => new vm.Script(response.text));
						assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
					} catch (err) {
						console.log({
							headers: response.headers,
							statusCode: response.statusCode
						});
						throw err;
					}
				});
		});
	}
});
