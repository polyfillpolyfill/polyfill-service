'use strict';

const sinon = require('sinon');
require('sinon-as-promised');

const fs = module.exports = sinon.stub();

fs.readFile = sinon.stub();
fs.readdirSync = sinon.stub();
