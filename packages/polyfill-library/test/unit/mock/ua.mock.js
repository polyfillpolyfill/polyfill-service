'use strict';

const sinon = require('sinon');

const UA = module.exports = sinon.stub();

const mockUAInstance = module.exports.mockUAInstance = {
	getFamily: sinon.stub(),
	getVersion: sinon.stub(),
	satisfies: sinon.stub(),
	getBaseline: sinon.stub(),
	meetsBaseline: sinon.stub(),
	isUnknown: sinon.stub()
};

UA.normalize = sinon.stub();
UA.getBaselines = sinon.stub();

UA.returns(mockUAInstance);
