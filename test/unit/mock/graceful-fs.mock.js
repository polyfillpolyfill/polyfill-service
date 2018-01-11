'use strict';

const sinon = require('sinon');

const fs = module.exports = sinon.stub();

fs.readFile = sinon.stub();
fs.readdirSync = sinon.stub();
fs.readFileSync = sinon.stub();
fs.createReadStream = sinon.stub();
