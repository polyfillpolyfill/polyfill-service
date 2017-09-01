'use strict';

const sinon = require('sinon');
require('sinon-as-promised');

module.exports = {
	Readable: sinon.stub(),
	Writable: sinon.stub()
};
