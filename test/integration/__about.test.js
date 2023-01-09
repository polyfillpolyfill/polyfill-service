/* eslint-env mocha */

"use strict";

const assert = require('proclaim');
const axios = require("./helpers.js");

describe("GET /__about", function() {
	context('compute-at-edge service', function() {
		it("responds with a 200 status", async () => {
			const response = await axios.get(`/__about?use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 200);
			assert.match(response.headers["content-type"], /application\/json; charset=(UTF|utf)-8/);
		});
	});

	context('vcl service', function() {
		it("responds with a 200 status", async () => {
			const response = await axios.get(`/__about?use-compute-at-edge-backend=no`);
		assert.equal(response.status, 200);
		assert.match(response.headers["content-type"], /application\/json; charset=(UTF|utf)-8/);
		});
	});
});
