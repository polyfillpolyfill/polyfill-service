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
	it("responds with a 401 status", () => {
		return request(host)
			.purge("/v3/polyfill.js")
			.expect(401);
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
			.expect("Vary", "User-Agent, Accept-Encoding")
			.then(response => {
				assert.equal(response.headers["content-encoding"], undefined);
			});
	});

	it("responds with gzip compression if client accepts gzip compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "gzip")
			.expect("Vary", "User-Agent, Accept-Encoding")
			.expect("Content-Encoding", "gzip");
	});

	it("responds with gzip compression if client accepts gzip and deflate compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "gzip, deflate")
			.expect("Vary", "User-Agent, Accept-Encoding")
			.expect("Content-Encoding", "gzip");
	});

	it("responds with brotli compression if client accepts brotli compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "br")
			.expect("Vary", "User-Agent, Accept-Encoding")
			.expect("Content-Encoding", "br");
	});

	it("responds with brotli compression if client accepts brotli and gzip compressed responses", () => {
		return request(host)
			.get("/v3/polyfill.js")
			.set("Fastly-Debug", "true")
			.set("Accept-Encoding", "br, gzip")
			.expect("Vary", "User-Agent, Accept-Encoding")
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
