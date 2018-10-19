/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const { Buffer } = require("buffer");

describe("create-response", function() {
	this.timeout(30000);
	it("exports a function", () => {
		proclaim.isFunction(require("../../../lib/create-response"));
	});

	it("Does not modify`body` if no `encoding` is set", async () => {
		const createResponse = require("../../../lib/create-response");
		const body = "https://www.example.com";
		const etag = "etag";
		const encoding = undefined;
		const result = createResponse(body, etag, encoding);
		proclaim.deepStrictEqual(result, {
			statusCode: 200,
			headers: {
				"Content-Encoding": undefined,
				"Content-Type": "application/javascript;charset=UTF-8",
				Etag: "etag"
			},
			body: body,
			isBase64Encoded: false
		});
	});

	it("Converts `body` to a base64 if `encoding` is set", async () => {
		const createResponse = require("../../../lib/create-response");
		const body = Buffer.from("https://www.example.com");
		const etag = "etag";
		const encoding = "br";
		const result = createResponse(body, etag, encoding);
		proclaim.deepStrictEqual(result, {
			statusCode: 200,
			headers: {
				"Content-Encoding": "br",
				"Content-Type": "application/javascript;charset=UTF-8",
				Etag: "etag"
			},
			body: "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20=",
			isBase64Encoded: true
		});
	});
});
