/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /", function() {
	it("responds with a 302 status", () => {
		return request(host)
			.get("/")
			.expect(302)
			.expect("Location", "/v2/docs/");
	});
});
