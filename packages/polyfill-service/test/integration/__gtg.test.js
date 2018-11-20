/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("./helpers").host;

describe("GET /__gtg", function() {
	it("responds with a 200 status", () => {
		return request(host)
			.get("/__gtg")
			.then(response => {
				try {
					assert.equal(response.statusCode, 200);
					assert.equal(response.headers["content-type"], "text/plain; charset=utf-8");
					assert.equal(response.headers["cache-control"], "no-cache");
					assert.isString(response.text);
					assert.equal(response.text, "OK");
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
