/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v1", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/v1")
			.expect(301)
			.expect("Location", "/v2/docs/");
	});
});
