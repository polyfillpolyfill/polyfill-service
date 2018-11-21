'use strict';

const sinon = require('sinon');

const fs = module.exports = sinon.stub();

fs.readFile = sinon.stub();
fs.readdir = sinon.stub();
fs.createReadStream = sinon.stub();
fs.stat = sinon.stub();
