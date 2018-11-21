/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.is);
});

it('has correct arity', function () {
	proclaim.arity(Object.is, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.is, 'is');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Object, 'is');
});

it('works as expected', function () {
	proclaim.isTrue(Object.is(1, 1));
	proclaim.isTrue(Object.is(NaN, NaN));
	proclaim.isFalse(Object.is(0, -0));
	proclaim.isFalse(Object.is({}, {}));
});
