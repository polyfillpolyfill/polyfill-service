/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.expm1);
});

it('has correct arity', function () {
	proclaim.arity(Math.expm1, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.expm1, 'expm1');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'expm1');
});

//TODO ADD MORE TESTS
