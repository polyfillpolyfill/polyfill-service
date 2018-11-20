"use strict";

const sinon = require("sinon");

module.exports = {
	gzip: sinon.stub().resolves(),
	Z_BEST_COMPRESSION: sinon.spy()
};
