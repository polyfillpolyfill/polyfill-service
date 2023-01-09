/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("./helpers.js");

describe("GET /__health", function() {
	context('compute-at-edge service', function() {
		it("responds with a 200 status", async() => {
		const response = await axios.get(`/__health?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 200);
		assert.match(response.headers["content-type"], /application\/json; charset=(UTF|utf)-8/);
		assert.equal(response.headers["cache-control"], "max-age=0, must-revalidate, no-cache, no-store, private");
		});
	});
	context('vcl service', function() {
		it("responds with a 200 status", async() => {
		const response = await axios.get(`/__health?use-compute-at-edge-backend=no`);
		assert.equal(response.status, 200);
		assert.match(response.headers["content-type"], /application\/json; charset=(UTF|utf)-8/);
		assert.equal(response.headers["cache-control"], "max-age=0, must-revalidate, no-cache, no-store, private");
		});
	});
});
