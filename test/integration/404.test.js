/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /404", function() {
	context('compute-at-edge service', function() {
		it("responds with a 404 status", () => {
			return request(host)
				.get("/404?use-compute-at-edge-backend=yes")
				.expect(404)
				.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", /text\/html; charset=(UTF|utf)-8/);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/pages/fixedData/?use-compute-at-edge-backend=yes")
				.expect(404);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/https://polyfill.io/?use-compute-at-edge-backend=yes")
				.expect(404);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/https://cdn.polyfill.io/?use-compute-at-edge-backend=yes")
				.expect(404);
		});
	});

	context('vcl service', function() {
		it("responds with a 404 status", () => {
			return request(host)
				.get("/404?use-compute-at-edge-backend=no")
				.expect(404)
				.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", /text\/html; charset=(UTF|utf)-8/);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/pages/fixedData/?use-compute-at-edge-backend=no")
				.expect(404);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/https://polyfill.io/?use-compute-at-edge-backend=no")
				.expect(404);
		});

		it("responds with a 404 status", () => {
			return request(host)
				.get("/https://cdn.polyfill.io/?use-compute-at-edge-backend=no")
				.expect(404);
		});
	});
});
