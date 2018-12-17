/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /404", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/404")
			.expect(404)
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
