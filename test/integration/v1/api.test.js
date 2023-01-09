/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("../helpers.js");

describe("GET /v1/polyfill.js", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.js?use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, '/v2/polyfill.js?use-compute-at-edge-backend=yes')
		});
	});
	context('vcl service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.js?use-compute-at-edge-backend=no`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, '/v2/polyfill.js?use-compute-at-edge-backend=no')
		});
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.js?features=default&use-compute-at-edge-backend=yes");
		});
	});
	context('vcl service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=no`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.js?features=default&use-compute-at-edge-backend=no");
		});
	});
});

describe("GET /v1/polyfill.min.js", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.min.js?use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.min.js?use-compute-at-edge-backend=yes");
		});
	});
	context('vcl service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.min.js?use-compute-at-edge-backend=no`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.min.js?use-compute-at-edge-backend=no");
		});
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.min.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.min.js?features=default&use-compute-at-edge-backend=yes");
		});
	});
	context('vcl service', function() {
		it("responds with a 301 status", async () => {
			const response = await axios.get(`/v1/polyfill.min.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=no`);
			assert.equal(response.status, 301)
			assert.equal(response.headers.location, "/v2/polyfill.min.js?features=default&use-compute-at-edge-backend=no");
		});
	});
});
