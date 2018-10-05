/* eslint-env mocha */

"use strict";

const mockery = require("mockery");
const proclaim = require("proclaim");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("create-polyfill-library", function() {
	this.timeout(30000);
	let createPolyfillLibrary;
	let PolyfillLibrary;

	beforeEach(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		PolyfillLibrary = require("../mock/PolyfillLibrary.mock");
		mockery.registerMock("polyfill-library", PolyfillLibrary);

		createPolyfillLibrary = require("../../../lib/create-polyfill-library");
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	it("exports a function", () => {
		proclaim.isFunction(createPolyfillLibrary);
	});

	it("when called with `latest`, returns a default PolyfillLibrary instance with no arguments", async () => {
		const result = await createPolyfillLibrary("latest");
		proclaim.calledWithNew(PolyfillLibrary);
		proclaim.calledOnce(PolyfillLibrary);
		proclaim.deepStrictEqual(PolyfillLibrary.firstCall.args, []);
		proclaim.isInstanceOf(result, PolyfillLibrary);
	});

	it("when called with with a version other than `latest`, returns a PolyfillLibrary instance which is configured to use that version of polyfills", async () => {
		const result = await createPolyfillLibrary("3.25.1");
		proclaim.calledWithNew(PolyfillLibrary);
		proclaim.calledOnce(PolyfillLibrary);
		proclaim.deepStrictEqual(PolyfillLibrary.firstCall.args.length, 1);
		proclaim.isInstanceOf(result, PolyfillLibrary);
	});
});
