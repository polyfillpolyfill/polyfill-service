/* eslint-env mocha */
/* globals proclaim, setImmediate, clearImmediate */

describe('setImmediate', function () {
	it('is a function', function () {
		proclaim.isFunction(setImmediate);
	});

	it('has correct arity', function () {
		proclaim.arity(setImmediate, 1);
	});

	it('has correct name', function () {
		proclaim.hasName(setImmediate, 'setImmediate');
	});
});

describe('clearImmediate', function () {
	it('is a function', function () {
		proclaim.isFunction(clearImmediate);
	});

	it('has correct arity', function () {
		proclaim.arity(clearImmediate, 1);
	});

	it('has correct name', function () {
		proclaim.hasName(clearImmediate, 'clearImmediate');
	});
});
