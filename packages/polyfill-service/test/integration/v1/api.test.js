/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v1/polyfill.js", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v1/polyfill.js")
			.expect(301)
			.expect("Location", "/v2/polyfill.js");
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v1/polyfill.js?features=default&libVersion=1&gated=true")
			.expect(301)
			.expect("Location", "/v2/polyfill.js?features=default");
	});
});

describe("GET /v1/polyfill.min.js", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v1/polyfill.min.js")
			.expect(301)
			.expect("Location", "/v2/polyfill.min.js");
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v1/polyfill.min.js?features=default&libVersion=1&gated=true")
			.expect(301)
			.expect("Location", "/v2/polyfill.min.js?features=default");
	});
});
