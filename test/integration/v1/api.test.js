/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "../helpers.js";

describe("GET /v1/polyfill.js", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.js?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, '/v2/polyfill.js?use-compute-at-edge-backend=yes')
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.js?features=default&use-compute-at-edge-backend=yes");
	});
});

describe("GET /v1/polyfill.min.js", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.min.js?use-compute-at-edge-backend=yes");
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 301 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 301)
		assert.equal(response.headers.location, "/v2/polyfill.min.js?features=default&use-compute-at-edge-backend=yes");
	});
});
