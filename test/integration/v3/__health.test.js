/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v3/__health", function() {
	this.timeout(30000);
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/__health")
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect("cache-control", "max-age=0, must-revalidate, no-cache, no-store, private");
	});
});
