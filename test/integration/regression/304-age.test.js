/* eslint-env mocha */

"use strict";

const assert = require("proclaim");
const axios = require("../helpers.js");
const randomFeature = Math.random();

describe("Request with a If-Modified-Since value which is before last-modified", function() {
	context('compute-at-edge service', function() {
		it(`responds with a 200 and an Age reset to 0`, async function() {
			await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`);
			const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`, {
				headers: {
					"if-modified-since": "Mon, 28 Jan 2019 00:00:00 GMT"
				}
			});
			assert.equal(response.status, 200);
			assert.equal(response.headers.age, 0);
		});
	});

	context('vcl service', function() {
		it(`responds with a 200 and an Age reset to 0`, async function() {
			await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`);
			const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`, {
				headers: {
					"if-modified-since": "Mon, 28 Jan 2019 00:00:00 GMT"
				}
			});
			assert.equal(response.status, 200);
			assert.equal(response.headers.age, 0);
		});
	});
});

describe("Request with a If-Modified-Since value which is the same as the last-modified", function() {
	context('compute-at-edge service', function() {
		it(`responds with a 304 and an Age reset to 0`, async function() {
			const firstResponse = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`);
			assert.equal(firstResponse.status, 200);
			const lastModified = firstResponse.headers["last-modified"];
			const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`, {
				headers: {
					"if-modified-since": lastModified
				}
			});
			assert.equal(response.status, 304);
			assert.equal(response.headers.age, 0);
		});
	});

	context('vcl service', function() {
		it(`responds with a 304 and an Age reset to 0`, async function() {
			const firstResponse = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`);
			assert.equal(firstResponse.status, 200);
			const lastModified = firstResponse.headers["last-modified"];
			const response = await axios.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`, {
				headers: {
					"if-modified-since": lastModified
				}
			});
			assert.equal(response.status, 304);
			assert.equal(response.headers.age, 0);
		});
	});
});
