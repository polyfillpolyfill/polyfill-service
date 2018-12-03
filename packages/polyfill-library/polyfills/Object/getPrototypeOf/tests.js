/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.getPrototypeOf);
});

it('has correct arity', function () {
	proclaim.arity(Object.getPrototypeOf, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.getPrototypeOf, 'getPrototypeOf');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'getPrototypeOf');
});
