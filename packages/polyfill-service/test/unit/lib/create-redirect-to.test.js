/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");

describe("create-redirect-to", function() {
	this.timeout(30000);
	it("exports a function", () => {
		proclaim.isFunction(require("../../../lib/create-redirect-to"));
	});

	it("returns a response object for AWS Lambda which 301 redirects to the given `url`", async () => {
		const createRedirectTo = require("../../../lib/create-redirect-to");
		const url = "https://www.example.com";
		const result = createRedirectTo(url);
		proclaim.deepStrictEqual(result, {
			statusCode: 301,
			headers: {
				Location: "https://www.example.com"
			}
		});
	});
});
