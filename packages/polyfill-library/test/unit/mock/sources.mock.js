'use strict';

const sinon = require('sinon');

module.exports = {
	polyfillExistsSync: sinon.stub(),
	getPolyfillMetaSync: sinon.stub(),
	listPolyfillsSync: sinon.stub(),
	listPolyfills: sinon.stub(),
	getConfigAliasesSync: sinon.stub(),
	streamPolyfillSource: sinon.stub(),
	getPolyfill: sinon.stub()
};
