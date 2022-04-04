"use strict";

const zlib = require("zlib");
const { BROTLI_PARAM_QUALITY, BROTLI_MAX_QUALITY } = zlib.constants;
const { PassThrough } = require("stream");

module.exports = function(compression) {
	switch (compression) {
		case "br":
			return zlib.createBrotliCompress({
				params: {
					[BROTLI_PARAM_QUALITY]: BROTLI_MAX_QUALITY
				}
			});
		case "gzip":
			return zlib.createGzip({
				level: zlib.Z_BEST_COMPRESSION
			});
		// eslint-disable-next-line unicorn/no-useless-switch-case
		case "identity":
		default:
			return new PassThrough();
	}
};
