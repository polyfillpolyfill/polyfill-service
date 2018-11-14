/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("./helpers").host;

describe("GET /__health", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/__health")
			.expect(200)
			.then(response => {
				try {
					assert.equal(response.statusCode, 200);
					assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
					assert.equal(response.headers["cache-control"], "no-cache");
				} catch (err) {
					console.log({
						headers: response.headers,
						statusCode: response.statusCode
					});
					throw err;
				}
			});
	});
});
