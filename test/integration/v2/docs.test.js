/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v2", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2")
			.set("Fastly-debug", "true")
			.expect(302)
			.expect("Location", "/v2/docs/")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/usage", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/usage")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, max-age=3600, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/api", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/api")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/contributing", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/contributing")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/examples", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/examples")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/features", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/features")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/contributing/authoring-polyfills", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/contributing/authoring-polyfills")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/contributing/common-scenarios", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/contributing/common-scenarios")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});

describe("GET /v2/docs/contributing/testing", function() {
	it("works as expected", function() {
		return request(host)
			.get("/v2/docs/contributing/testing")
			.set("Fastly-debug", "true")
			.expect(200)
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("surrogate-key", "polyfill-service");
	});
});
