/* eslint-env mocha */

"use strict";

const request = require("supertest");
const host = require("../helpers").host;
const randomFeature = Math.random();

describe("Request with a If-Modified-Since value which is before last-modified", function() {
	context('compute-at-edge service', function() {
		it(`responds with a 200 and an Age reset to 0`, function() {
			this.timeout(30000);
			return request(host)
				.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`)
				.expect(200)
				.then(() => {
					return request(host)
						.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`)
						.set("if-modified-since", "Mon, 28 Jan 2019 00:00:00 GMT")
						.expect(200)
						.expect("Age", "0");
				});
		});
	});

	context('vcl service', function() {
		it(`responds with a 200 and an Age reset to 0`, function() {
			this.timeout(30000);
			return request(host)
				.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`)
				.expect(200)
				.then(() => {
					return request(host)
						.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`)
						.set("if-modified-since", "Mon, 28 Jan 2019 00:00:00 GMT")
						.expect(200)
						.expect("Age", "0");
				});
		});
	});
});

describe("Request with a If-Modified-Since value which is the same as the last-modified", function() {
	context('compute-at-edge service', function() {
		it(`responds with a 304 and an Age reset to 0`, function() {
			this.timeout(30000);
			return request(host)
				.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`)
				.expect(200)
				.then(response => {
					const lastModified = response.headers["last-modified"];

					return request(host)
						.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=yes`)
						.set("if-modified-since", lastModified)
						.expect(304)
						.expect("Age", "0");
				});
		});
	});

	context('vcl service', function() {
		it(`responds with a 304 and an Age reset to 0`, function() {
			this.timeout(30000);
			return request(host)
				.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`)
				.expect(200)
				.then(response => {
					const lastModified = response.headers["last-modified"];

					return request(host)
						.get(`/v3/polyfill.min.js?features=${randomFeature}&use-compute-at-edge-backend=no`)
						.set("if-modified-since", lastModified)
						.expect(304)
						.expect("Age", "0");
				});
		});
	});
});
