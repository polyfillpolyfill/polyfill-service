/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const mockery = require("mockery");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("compress-bundle", function() {
	this.timeout(30000);
	let zlib;
	let compressBundle;

	beforeEach(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		zlib = require("../mock/zlib.mock");
		mockery.registerMock("zlib", zlib);

		compressBundle = require("../../../server/lib/compress-bundle");
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	it("exports a function", () => {
		proclaim.isFunction(compressBundle);
	});

	it("returns `file` if `compression` is not set to either `br` or `gzip`", async () => {
		const file = "This is the file";
		const result = await compressBundle(undefined, file);
		proclaim.deepStrictEqual(result, file);
	});

	it("gzips `file` with best compression if `compression` is `gzip`", async () => {
		const file = "This is the file";
		const result = compressBundle("gzip", file);
		proclaim.notEqual(result, file);
		proclaim.calledOnce(zlib.gzip);
		proclaim.calledWith(zlib.gzip, file, {
			level: zlib.Z_BEST_COMPRESSION
		});
	});

	it("brotlis `file` with best compression if `compression` is `br`", async () => {
		const file = "This is the file";
		const result = compressBundle("br", file);
		proclaim.notEqual(result, file);
		proclaim.calledOnce(zlib.BrotliCompress);
		proclaim.calledWith(zlib.BrotliCompress, file, {
			params: { quality: 11 }
		});
	});
});
