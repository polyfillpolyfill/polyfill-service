'use strict';

const sinon = require('sinon');

const proc = module.exports = sinon.stub();

proc.exit = sinon.stub();
