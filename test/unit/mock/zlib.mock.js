"use strict";

const sinon = require("sinon");

module.exports = {
	createGzip: sinon.stub(),
	Z_BEST_COMPRESSION: sinon.spy(),
	createBrotliCompress: sinon.stub(),
	constants: {
		BROTLI_PARAM_QUALITY: "quality",
		BROTLI_MAX_QUALITY: 11
	}
};
