/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const host = require("../helpers").host;
const vm = require("vm");

describe("https://github.com/Financial-Times/polyfill-service/issues/1865", function() {
	it("responds with a bundle containing the correct polyfills", function() {
		this.timeout(30000);
		return request(host)
			.get("/v2/polyfill.minify.js")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
			});
	});
});
