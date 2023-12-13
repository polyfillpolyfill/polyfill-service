/* eslint-env mocha */

"use strict";

import vm from "node:vm";
import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v1/polyfill.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v1/polyfill.js`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=UTF-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v1/polyfill.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v1/polyfill.js?features=default&libVersion=1&gated=true`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=UTF-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v1/polyfill.min.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=UTF-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v1/polyfill.min.js?features=default&libVersion=1&gated=true`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=UTF-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});
