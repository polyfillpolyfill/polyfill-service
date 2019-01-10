/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const vm = require("vm");
const host = require("../helpers").host;

describe("GET /v2/polyfill.js", function() {
	this.timeout(30000);
	it("responds with valid javascript", function() {
		return request(host)
			.get("/v2/polyfill.js")
			.set("Fastly-debug", "true")
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

describe("GET /v2/polyfill.js?callback=AAA&callback=BBB", function() {
	this.timeout(30000);
	it("responds with valid javascript", function() {
		return request(host)
			.get("/v2/polyfill.js?callback=AAA&callback=BBB")
			.set("Fastly-debug", "true")
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

describe("GET /v2/polyfill.min.js", function() {
	this.timeout(30000);
	it("responds with valid javascript", function() {
		return request(host)
			.get("/v2/polyfill.min.js")
			.set("Fastly-debug", "true")
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

describe("GET /v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	this.timeout(30000);
	it("responds with valid javascript", function() {
		return request(host)
			.get("/v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1")
			.set("Fastly-debug", "true")
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

describe("GET /v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	this.timeout(30000);
	it("responds with valid javascript", function() {
		return request(host)
			.get("/v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1")
			.set("Fastly-debug", "true")
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
