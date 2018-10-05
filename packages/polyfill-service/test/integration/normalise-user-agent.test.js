/* eslint-env mocha */
"use strict";

const request = require("supertest");
const host = require("./helpers").host;

const test_cases = require("./normalise-user-agent-test-cases.json");

describe("normalise-user-agent should normalise user-agents correctly", function() {
	this.timeout(30000);

	test_cases.forEach(function({ input, output }) {
		it(`normalises ${input} into ${output}`, function() {
			return request(host)
				.get(`/v2/normalizeUa?ua=${input}`)
				.set("User-Agent", input)
				.expect("Normalized-User-Agent", encodeURIComponent(output.toLowerCase()));
		});
	});
});
