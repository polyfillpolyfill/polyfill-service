'use strict';

const sinon = require('sinon');

const merge2 = module.exports = sinon.stub();

const merge2Instance = sinon.stub();

merge2Instance.add = sinon.stub();

merge2.merge2Instance = merge2Instance;

merge2.returns(merge2Instance);
