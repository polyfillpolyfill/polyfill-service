/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("../helpers.js");

describe("GET /v1", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1?use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, '/v3/')
		});
	});
	context('vcl service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1?use-compute-at-edge-backend=no`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, '/v3/')
		});
	});
});
