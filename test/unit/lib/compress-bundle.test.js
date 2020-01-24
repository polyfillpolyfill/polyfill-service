/* eslint-env mocha */

"use strict";

const proclaim = require("proclaim");
const mockery = require("mockery");
const sinon = require("sinon");

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ""
});

describe("createCompressor", function() {
	this.timeout(30000);
	let zlib;
	let createCompressor;
	let gzipCompressor;
	let brotliCompressor;

	beforeEach(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		zlib = require("../mock/zlib.mock");
		mockery.registerMock("zlib", zlib);

		gzipCompressor = {};
		zlib.createGzip.returns(gzipCompressor);
		brotliCompressor = {};
		zlib.createBrotliCompress.returns(brotliCompressor);

		createCompressor = require("../../../server/lib/create-compressor");
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	it("exports a function", () => {
		proclaim.isFunction(createCompressor);
	});

	it("returns `PassThrough` if `compression` is not set to either `br` or `gzip`", async () => {
		const result = await createCompressor(undefined);
		proclaim.isInstanceOf(result, require("stream").PassThrough);
	});
	it("returns `PassThrough` if `compression` is `identity`", async () => {
		const result = await createCompressor("identity");
		proclaim.isInstanceOf(result, require("stream").PassThrough);
	});

	it("returns `gzip` compressor if `compression` is `gzip`", async () => {
		const result = createCompressor("gzip");
		proclaim.calledOnce(zlib.createGzip);
		proclaim.calledWith(zlib.createGzip, {
			level: zlib.Z_BEST_COMPRESSION
		});
		proclaim.deepStrictEqual(result, gzipCompressor);
	});

	it("returns brotli compressor if `compression` is `br`", async () => {
		const result = createCompressor("br");
		proclaim.calledOnce(zlib.createBrotliCompress);
		proclaim.calledWith(zlib.createBrotliCompress, {
			params: { quality: 11 }
		});
		proclaim.deepStrictEqual(result, brotliCompressor);
	});
});
