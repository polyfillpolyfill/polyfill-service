/* eslint-env mocha */

"use strict";

import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v1/polyfill.js", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.js`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, '/v2/polyfill.js')
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.js?features=default&libVersion=1&gated=true`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.js?features=default");
	});
});

describe("GET /v1/polyfill.min.js", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.min.js");
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js?features=default&libVersion=1&gated=true`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.min.js?features=default");
	});
});
