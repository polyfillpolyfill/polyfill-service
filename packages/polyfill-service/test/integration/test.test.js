/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /test/test", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/test")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/test/", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/test/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/tests", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/tests")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/tests/", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/tests/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe.skip("GET /test/libs/mocha/mocha.css", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/libs/mocha/mocha.css")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/css; charset=UTF-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe.skip("GET /test/libs/mocha/mocha.js", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/libs/mocha/mocha.js")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "application/javascript; charset=UTF-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe.skip("GET /test/libs/proclaim/proclaim.js", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/libs/proclaim/proclaim.js")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "application/javascript; charset=UTF-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/director/", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/director/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/director/", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/director/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /test/director/", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/test/director/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.expect("surrogate-key", "polyfill-service");
	});
});
