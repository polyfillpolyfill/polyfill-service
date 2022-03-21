/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v1/polyfill.js", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.js?use-compute-at-edge-backend=yes")
				.expect(301)
				.expect("Location", "/v2/polyfill.js?use-compute-at-edge-backend=yes");
		});
	});

	context('vcl service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.js?use-compute-at-edge-backend=no")
				.expect(301)
				.expect("Location", "/v2/polyfill.js?use-compute-at-edge-backend=no");
		});
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true&", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes")
				.expect(301)
				.expect("Location", "/v2/polyfill.js?features=default&use-compute-at-edge-backend=yes");
		});
	});

	context('vcl service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=no")
				.expect(301)
				.expect("Location", "/v2/polyfill.js?features=default&use-compute-at-edge-backend=no");
		});
	});
});

describe("GET /v1/polyfill.min.js", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.min.js?use-compute-at-edge-backend=yes")
				.expect(301)
				.expect("Location", "/v2/polyfill.min.js?use-compute-at-edge-backend=yes");
		});
	});

	context('vcl service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.min.js?use-compute-at-edge-backend=no")
				.expect(301)
				.expect("Location", "/v2/polyfill.min.js?use-compute-at-edge-backend=no");
		});
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	context('compute-at-edge service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.min.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=yes")
				.expect(301)
				.expect("Location", "/v2/polyfill.min.js?features=default&use-compute-at-edge-backend=yes");
		});
	});

	context('vcl service', function() {
		it("responds with a 301 status", () => {
			return request(host)
				.get("/v1/polyfill.min.js?features=default&libVersion=1&gated=true&use-compute-at-edge-backend=no")
				.expect(301)
				.expect("Location", "/v2/polyfill.min.js?features=default&use-compute-at-edge-backend=no");
		});
	});
});
