/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v2", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v2")
			.expect(301)
			.expect("Location", "/v3/");
	});
});

describe("GET /v2/docs", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v2/docs")
			.expect(301)
			.expect("Location", "/v3/");
	});
});
