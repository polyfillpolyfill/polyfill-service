'use strict';

const sinon = require('sinon');
require('sinon-as-promised');

const path = module.exports = sinon.stub();

path.join = sinon.stub();
