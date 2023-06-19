/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v2", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v2`);
		assert.equal(response.status, 301);
		assert.equal(response.headers["location"], "/v3/");
	});
});

describe("GET /v2/docs", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v2/docs`);
		assert.equal(response.status, 301);
		assert.equal(response.headers["location"], "/v3/");
	});
});
