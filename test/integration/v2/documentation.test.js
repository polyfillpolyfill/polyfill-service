/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "../helpers.js";

describe("GET /v2", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v2?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301);
		assert.equal(response.headers["location"], "/v3/");
	});
});

describe("GET /v2/docs", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v2/docs?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301);
		assert.equal(response.headers["location"], "/v3/");
	});
});
