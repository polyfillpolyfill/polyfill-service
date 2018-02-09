/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.atanh);
});

it('has correct arity', function () {
	proclaim.arity(Math.atanh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.atanh, 'atanh');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'atanh');
});

// TODO ADD MORE TESTS
