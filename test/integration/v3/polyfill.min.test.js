/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const vm = require("vm");
const host = require("../helpers").host;

describe("OPTIONS /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.options("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("Allow", "OPTIONS, GET, HEAD");
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.options("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("Allow", "OPTIONS, GET, HEAD");
		});
	});
});

describe("POST /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 405 status", () => {
			return request(host)
				.post("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.expect(405);
		});
	});
	context('vcl service', function() {
		it("responds with a 405 status", () => {
			return request(host)
				.post("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.expect(405);
		});
	});
});

describe("DELETE /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 405 status", () => {
			return request(host)
				.delete("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.expect(405);
		});
	});
	context('vcl service', function() {
		it("responds with a 405 status", () => {
			return request(host)
				.delete("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.expect(405);
		});
	});
});

describe("PURGE /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 401 status", () => {
			return request(host)
				.purge("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.expect(401);
		});
	});
	context('vcl service', function() {
		it("responds with a 401 status", () => {
			return request(host)
				.purge("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.expect(401);
		});
	});
});

describe("HEAD /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.head("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/);
		});
	});

	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.head("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/);
		});
	});
});

describe("GET /v3/polyfill.min.js", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?use-compute-at-edge-backend=yes")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?use-compute-at-edge-backend=no")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
});

describe("GET /v3/polyfill.min.js?callback=AAA&callback=BBB", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?callback=AAA&callback=BBB&use-compute-at-edge-backend=yes")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?callback=AAA&callback=BBB&use-compute-at-edge-backend=no")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
});

describe("GET /v3/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1&use-compute-at-edge-backend=yes")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					// vm.Script will cause the event loop to become blocked whilst it parses the large response
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/v3/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1&use-compute-at-edge-backend=no")
				.set("Fastly-Debug", "true")
				.expect(200)
				.expect("Content-Type", "text/javascript; charset=utf-8")
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("surrogate-key", /polyfill-service/)
				.then(response => {
					assert.isString(response.text);
					// vm.Script will cause the event loop to become blocked whilst it parses the large response
					assert.doesNotThrow(() => new vm.Script(response.text));
					assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
				});
		});
	});
});
