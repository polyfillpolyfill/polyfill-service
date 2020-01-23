"use strict";

const zlib = require("zlib");
const { BROTLI_PARAM_QUALITY, BROTLI_MAX_QUALITY } = zlib.constants;
const brotliCompress = zlib.createBrotliCompress({
	params: {
		[BROTLI_PARAM_QUALITY]: BROTLI_MAX_QUALITY
	}
});
const gzipCompress = zlib.createGzip({
	level: zlib.Z_BEST_COMPRESSION
});
const { PassThrough } = require("stream");

module.exports = function(compression) {
	switch (compression) {
		case "gzip":
			return gzipCompress;
		case "br":
			return brotliCompress;
		case "identity":
		default:
			return PassThrough;
	}
};
