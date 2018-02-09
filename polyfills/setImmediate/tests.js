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

	it('is enumerable', function () {
		proclaim.enumerable(window, 'setImmediate');
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

	it('is enumerable', function () {
		proclaim.enumerable(window, 'clearImmediate');
	});
});
