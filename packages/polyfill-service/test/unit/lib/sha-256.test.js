/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");

describe("sha-256", function() {
	this.timeout(30000);
	it("exports a function", () => {
		proclaim.isFunction(require("../../../server/lib/sha-256"));
	});

	it("returns a sha-256 hash of the `contents`", async () => {
		const sha256 = require("../../../server/lib/sha-256");
		const contents = "This is the contents";
		const result = sha256(contents);
		proclaim.deepStrictEqual(result, "d354aaf2a49e9e99f972dc5e0144be0af546b4cdac1305f6378e6774c7d0129a");
	});
});
