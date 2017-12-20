/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Object.values, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Object.values.length, 1);
});

it('works with objects', function () {
	proclaim.equal(Object.values({}).length, 0);

	proclaim.equal(Object.values({
		foo: true
	}).length, 1);

	proclaim.equal(Object.values({
		foo: true,
		bar: false
	}).length, 2);
});

it('works with objects containing otherwise non-enumerable keys', function () {
	proclaim.equal(Object.values({
		toString: function () {}
	}).length, 1);

	proclaim.equal(Object.values({
		constructor: 0,
		hasOwnProperty: 0,
		isPrototypeOf: 0,
		propertyIsEnumerable: 0,
		toString: 0,
		toLocaleString: 0,
		valueOf: 0
	}).length, 7);
});
