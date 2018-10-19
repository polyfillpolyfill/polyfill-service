/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("create-polyfill-bundle", function() {
	this.timeout(30000);
	let createPolyfillBundle;

	beforeEach(() => {
		createPolyfillBundle = require("../../../lib/create-polyfill-bundle");
	});

	it("exports a function", () => {
		proclaim.isFunction(createPolyfillBundle);
	});

	it("passes `params` into `polyfillio.getPolyfillString` and returns result unaltered", async () => {
		const params = {};
		const bundle = "I am the polyfill bundle;";
		const polyfillio = {
			getPolyfillString: sinon.stub().resolves(bundle)
		};
		const result = await createPolyfillBundle(params, polyfillio);
		proclaim.deepStrictEqual(result, bundle);
	});
});
