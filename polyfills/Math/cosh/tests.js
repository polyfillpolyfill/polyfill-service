/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.cosh);
});

it('has correct arity', function () {
	proclaim.arity(Math.cosh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.cosh, 'cosh');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'cosh');
});

// TODO ADD MORE TESTS
