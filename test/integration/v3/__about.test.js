/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v3/__about", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/__about")
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});
});
