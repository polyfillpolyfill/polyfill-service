'use strict';

const sinon = require('sinon');

const tsort = module.exports = sinon.stub();

const tsortInstance = sinon.stub();

tsortInstance.add = sinon.stub();
tsortInstance.sort = sinon.stub();

tsort.tsortInstance = tsortInstance;

tsort.returns(tsortInstance);
