"use strict";

const denodeify = require("denodeify");
const zlib = require("zlib");
const { BROTLI_PARAM_QUALITY, BROTLI_MAX_QUALITY } = zlib.constants;
const brotliCompress = denodeify(zlib.BrotliCompress);
const gzipCompress = denodeify(zlib.gzip.bind(zlib));

module.exports = function compressBundle(compression, file) {
	switch (compression) {
		case "gzip":
			return gzipCompress(file, {
				level: zlib.Z_BEST_COMPRESSION
			});
		case "br":
			return brotliCompress(Buffer.from(file), {
				params: {
					[BROTLI_PARAM_QUALITY]: BROTLI_MAX_QUALITY
				}
			});
		case "identity":
		default:
			return Promise.resolve(file);
	}
};
