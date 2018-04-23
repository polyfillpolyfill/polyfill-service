'use strict';

const sinon = require('sinon');

const lruCache = module.exports = sinon.stub();

lruCache.set = sinon.stub();
lruCache.get = sinon.stub();
lruCache.instance = {
	set: lruCache.set,
	get: lruCache.get
};

lruCache.returns(lruCache.instance);
