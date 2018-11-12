/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /__health", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/__health")
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
	});
});
