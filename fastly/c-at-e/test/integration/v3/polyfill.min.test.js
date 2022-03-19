/* eslint-env mocha */

"use strict";

import vm from "vm";
import assert from "proclaim";
import axios from "../helpers.js";

	describe("GET /v3/polyfill.js", function() {
		it("responds with a 200 status", async () => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
			assert.equal(response.headers["access-control-allow-origin"], "*")
			assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
			assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			assert.include(response.headers["surrogate-key"], 'polyfill-service');
			assert.isString(response.data);
			assert.doesNotThrow(() => new vm.Script(response.data));
			assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
		});
	});

	describe("GET /v3/polyfill.js?features=carrot&strict", function() {
		it("responds with a 200 status", async () => {
			const response = await axios.get(`/v3/polyfill.js?features=carrot&strict&use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
			assert.equal(response.headers["access-control-allow-origin"], "*")
			assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
			assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			assert.include(response.headers["surrogate-key"], 'polyfill-service');
			assert.isString(response.data);
			assert.doesNotThrow(() => new vm.Script(response.data));
			assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
		});
	});

	describe("GET /v3/polyfill.js?callback=AAA&callback=BBB", function() {
		it("responds with a 200 status", async () => {
			const response = await axios.get(`/v3/polyfill.js?callback=AAA&callback=BBB&use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
			assert.equal(response.headers["access-control-allow-origin"], "*")
			assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
			assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
			assert.include(response.headers["surrogate-key"], 'polyfill-service');
			assert.isString(response.data);
			assert.doesNotThrow(() => new vm.Script(response.data));
			assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
		});
	});

	describe("encoding", function() {
		it("responds with no compression if client does not accept compressed responses", async () => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true",
					"Accept-Encoding": "identity"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
			assert.equal(response.headers["content-encoding"], undefined)
		});

		it("responds with gzip compression if client accepts gzip compressed responses", async() => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true",
					"Accept-Encoding": "gzip"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
			assert.equal(response.headers["content-encoding"], "gzip")
		});

		it("responds with gzip compression if client accepts gzip and deflate compressed responses", async () => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true",
					"Accept-Encoding": "gzip, deflate"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
			assert.equal(response.headers["content-encoding"], "gzip")
		});

		it("responds with brotli compression if client accepts brotli compressed responses", async () => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true",
					"Accept-Encoding": "br"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
			assert.equal(response.headers["content-encoding"], "br")
		});

		it("responds with brotli compression if client accepts brotli and gzip compressed responses", async () => {
			const response = await axios.get(`/v3/polyfill.js?use-compute-at-edge-backend=yes`, {
				headers: {
					"Fastly-Debug": "true",
					"Accept-Encoding": "br, gzip"
				}
			});

			assert.equal(response.status, 200);
			assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
			assert.equal(response.headers["content-encoding"], "br")
		});
	});


describe("OPTIONS /v3/polyfill.min.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.options(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 200);
		assert.equal(response.headers.allow, "OPTIONS, GET, HEAD");
	});
});

describe("POST /v3/polyfill.min.js", function() {
	it("responds with a 405 status", async () => {
		const response = await axios.post(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 405);
	});
});

describe("DELETE /v3/polyfill.min.js", function() {
	it("responds with a 405 status", async () => {
		const response = await axios.delete(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`);
		assert.equal(response.status, 405);
	});
});

// describe("PURGE /v3/polyfill.min.js", function() {
// 	it("responds with a 401 status", async () => {
// 		const response = await axios.purge(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`);
// 		assert.equal(response.status, 401);
// 	});
// });

describe("HEAD /v3/polyfill.min.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.head(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`, {
			headers: {
				"Fastly-Debug": "true"
			}
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
		assert.include(response.headers["surrogate-key"], 'polyfill-service');
	});
});


describe("GET /v3/polyfill.min.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.min.js?use-compute-at-edge-backend=yes`, {
			headers: {
				"Fastly-Debug": "true"
			}
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
		assert.include(response.headers["surrogate-key"], 'polyfill-service');

		assert.isString(response.data);
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v3/polyfill.min.js?callback=AAA&callback=BBB", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.min.js?callback=AAA&callback=BBB&use-compute-at-edge-backend=yes`, {
			headers: {
				"Fastly-Debug": "true"
			}
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
		assert.include(response.headers["surrogate-key"], 'polyfill-service');

		assert.isString(response.data);
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v3/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1&use-compute-at-edge-backend=yes`, {
			headers: {
				"Fastly-Debug": "true"
			}
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=utf-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800")
		assert.include(response.headers["surrogate-key"], 'polyfill-service');

		assert.isString(response.data);
		// vm.Script will cause the event loop to become blocked whilst it parses the large response
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.notMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});
