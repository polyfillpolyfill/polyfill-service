/* eslint-env mocha */

"use strict";

import vm from "node:vm";
import assert from "node:assert";
import axios from "../helpers.js";

describe("GET /v2/polyfill.js", function() {
	it("responds with valid javascript", async function() {
		const response = await axios.get(`/v2/polyfill.js`, {
			headers: {
				"Fastly-debug": "true",
			}
		});
		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v2/polyfill.js?callback=AAA&callback=BBB", function() {
	it("responds with valid javascript", async function() {
		const response = await axios.get(`/v2/polyfill.js?callback=AAA&callback=BBB`, {
			headers: {
				"Fastly-debug": "true",
			}
		});
		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v2/polyfill.min.js", function() {
	it("responds with valid javascript", async function() {
		const response = await axios.get(`/v2/polyfill.min.js`, {
			headers: {
				"Fastly-debug": "true",
			}
		});
		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	it("responds with valid javascript", async function() {
		const response = await axios.get(`/v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1`, {
			headers: {
				"Fastly-debug": "true",
			}
		});
		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		// vm.Script will cause the event loop to become blocked whilst it parses the large response
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1", function() {
	it("responds with valid javascript", async function() {
		const response = await axios.get(`/v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1`, {
			headers: {
				"Fastly-debug": "true",
			}
		});
		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		// vm.Script will cause the event loop to become blocked whilst it parses the large response
		assert.doesNotThrow(() => new vm.Script(response.data));
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});
