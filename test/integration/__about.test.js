/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /__about", function() {
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__about?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});

	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__about?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});
});
