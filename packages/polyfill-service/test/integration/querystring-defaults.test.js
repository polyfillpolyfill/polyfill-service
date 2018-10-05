/* eslint-env mocha */
"use strict";

const assert = require("proclaim");
const request = require("supertest");

const host = require("./helpers").host;

describe("Default parameters for requests", function() {
	it("should be what we expect", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
			.set("Accept-Encoding", "identity")
			.then(res => {
				assert.deepStrictEqual(res.body, {
					features: "default",
					excludes: "",
					rum: "0",
					unknown: "polyfill",
					flags: "",
					ua: "other/0.0.0",
					callback: "",
					compression: "",
					version: "latest"
				});
			});
	});

	it("should be what we expect", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
			.set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36")
			.set("Accept-Encoding", "identity")
			.then(res => {
				assert.deepStrictEqual(res.body, {
					features: "default",
					excludes: "",
					rum: "0",
					unknown: "polyfill",
					flags: "",
					ua: "chrome/66.0.0",
					callback: "",
					compression: "",
					version: "latest"
				});
			});
	});
});
