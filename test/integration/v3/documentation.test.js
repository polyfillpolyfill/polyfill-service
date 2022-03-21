/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;

describe("GET /v3/", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/api", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/api/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/api/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/url-builder", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/url-builder/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/url-builder/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/privacy-policy", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/privacy-policy/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/privacy-policy/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/report-a-bug", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/report-a-bug/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/report-a-bug/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/supported-browsers", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/supported-browsers/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/supported-browsers/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
describe("GET /v3/terms", function() {
	context('compute-at-edge service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/terms/?use-compute-at-edge-backend=yes")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});

	context('vcl service', function() {
		it("works as expected", function() {
			return request(host)
				.get("/v3/terms/?use-compute-at-edge-backend=no")
				.expect(200)
				.expect("cache-control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
				.expect("Content-Type", "text/html; charset=UTF-8");
		});
	});
});
