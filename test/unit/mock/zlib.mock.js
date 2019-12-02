"use strict";

const sinon = require("sinon");

module.exports = {
	gzip: sinon.stub().resolves(),
	Z_BEST_COMPRESSION: sinon.spy(),
	brotliCompress: sinon.stub().resolves(),
	constants: {
		BROTLI_PARAM_QUALITY: "quality",
		BROTLI_MAX_QUALITY: 11
	}
};
