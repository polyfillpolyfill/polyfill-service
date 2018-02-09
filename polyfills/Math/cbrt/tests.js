/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.cbrt);
});

it('has correct arity', function () {
	proclaim.arity(Math.cbrt, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.cbrt, 'cbrt');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'cbrt');
});

// TODO ADD MORE TESTS
