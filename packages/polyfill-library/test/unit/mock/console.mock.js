'use strict';

const sinon = require('sinon');

const console = module.exports = sinon.stub();

console.log = sinon.stub();
