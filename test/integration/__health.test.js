/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /__health", function() {
	this.timeout(30000);
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__health?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("Content-Type", /application\/json; charset=(UTF|utf)-8/)
				.expect("cache-control", "max-age=0, must-revalidate, no-cache, no-store, private");
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__health?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("Content-Type", /application\/json; charset=(UTF|utf)-8/)
				.expect("cache-control", "max-age=0, must-revalidate, no-cache, no-store, private");
		});
	});
});
