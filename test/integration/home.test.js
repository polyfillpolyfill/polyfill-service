/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /", function() {
	it("responds with a 301 status", () => {
		return request(host)
			.get("/")
			.expect(301)
			.expect("Location", "/v3/");
	});
});
