'use strict';

const sinon = require('sinon');

const instance = {
	polyfillExists: sinon.stub().resolves(),
	getPolyfillMeta: sinon.stub().resolves(),
	listPolyfills: sinon.stub().resolves(),
	getConfigAliases: sinon.stub().resolves(),
	streamPolyfillSource: sinon.stub(),
};

module.exports = sinon.stub().returns(instance);
module.exports.instance = instance;
