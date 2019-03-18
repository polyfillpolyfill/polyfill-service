/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("../helpers").host;

describe("Requests made from an external Fastly proxy have correct headers", function() {
	it(`responds to a polyfill request with Fastly headers with a full set of Vary headers`, function() {
		this.timeout(30000);
		return request(host)
			.get("/v3/polyfill.min.js")
			.set("Fastly-FF", "1")
			.expect(200)
			.expect("Vary", "User-Agent, Accept-Encoding")
			.then(response => {
				assert.isString(response.text);
			});
	});
});
