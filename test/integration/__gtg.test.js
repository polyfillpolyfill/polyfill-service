/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("./helpers").host;

describe("GET /__gtg", function() {
	context('compute-at-edge service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__gtg?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("Content-Type", "text/plain; charset=utf-8")
				.expect("cache-control", "max-age=0, must-revalidate, no-cache, no-store, private")
				.then(response => {
					assert.isString(response.text);
					assert.equal(response.text, "OK");
				});
		});
	});

	context('vcl service', function() {
		it("responds with a 200 status", () => {
			return request(host)
				.get("/__gtg?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("Content-Type", "text/plain; charset=utf-8")
				.expect("cache-control", "max-age=0, must-revalidate, no-cache, no-store, private")
				.then(response => {
					assert.isString(response.text);
					assert.equal(response.text, "OK");
				});
		});
	});
});
