/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v3/", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/api", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/api")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/polyfills", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/polyfills")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/privacy-policy", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/privacy-policy")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/report-a-bug", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/report-a-bug")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/supported-browsers", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/supported-browsers")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
describe("GET /v3/terms", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v3/terms")
			.expect(200)
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
