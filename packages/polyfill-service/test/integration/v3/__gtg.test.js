/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("../helpers").host;

describe("GET /v3/__gtg", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/v3/__gtg")
			.expect(200)
			.expect("Content-Type", "text/plain; charset=utf-8")
			.expect("cache-control", "no-store, private")
			.then(response => {
				assert.isString(response.text);
				assert.equal(response.text, "OK");
			});
	});
});
