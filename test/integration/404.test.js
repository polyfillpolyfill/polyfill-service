/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("./helpers").host;

describe("GET /404", function() {
	it("responds with a 404 status", () => {
		return request(host)
			.get("/404")
			.expect(404)
			.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});

	it("responds with a 404 status", () => {
		return request(host)
			.get("/pages/fixedData/")
			.expect(404)
			.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});

	it("responds with a 404 status", () => {
		return request(host)
			.get("/https://polyfill.io/")
			.expect(404)
			.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});

	it("responds with a 404 status", () => {
		return request(host)
			.get("/https://cdn.polyfill.io/")
			.expect(404)
			.expect("Cache-Control", "max-age=30, public, s-maxage=31536000, stale-while-revalidate=604800, stale-if-error=604800")
			.expect("Content-Type", "text/html; charset=utf-8");
	});
});
