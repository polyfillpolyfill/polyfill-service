"use strict";

const denodeify = require("denodeify");
const zlib = require("zlib");
const brotliCompress = denodeify(require("iltorb").compress);
const gzipCompress = denodeify(zlib.gzip.bind(zlib));

module.exports = function compressBundle(compression, file) {
	switch (compression) {
		case "gzip":
			return gzipCompress(file, {
				level: zlib.Z_BEST_COMPRESSION
			});
		case "br":
			return brotliCompress(Buffer.from(file), {
				quality: 11
			});
		case "identity":
		default:
			return Promise.resolve(file);
	}
};
