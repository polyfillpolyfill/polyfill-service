/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("./helpers").host;

describe("GET /robots.txt", function() {
	context('compute-at-edge service', function() {
		it("does not disallow any paths", function() {
			return request(host)
				.get("/robots.txt?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("Content-Type", "text/plain; charset=utf-8")
				.then(response => {
					assert.isString(response.text);
					assert.equal(response.text, "User-agent: *\nDisallow:");
				});
		});
	});

	context('vcl service', function() {
		it("does not disallow any paths", function() {
			return request(host)
				.get("/robots.txt?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("Content-Type", "text/plain; charset=utf-8")
				.then(response => {
					assert.isString(response.text);
					assert.equal(response.text, "User-agent: *\nDisallow:");
				});
		});
	});
});
