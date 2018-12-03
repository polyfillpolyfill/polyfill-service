/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.getOwnPropertyNames);
});

it('has correct arity', function () {
	proclaim.arity(Object.getOwnPropertyNames, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.getOwnPropertyNames, 'getOwnPropertyNames');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'getOwnPropertyNames');
});

it('returns properties of a simple object', function () {
	proclaim.deepEqual(Object.getOwnPropertyNames({foo:42}), ["foo"]);
});

it('does not throw an exception when used on window object', function () {
	proclaim.doesNotThrow(function () {
		Object.getOwnPropertyNames(window);
	});
});

it('does not include properties inherited from a prototype', function () {
	var A = function() { this.foo = true; };
	A.prototype = {bar: true};
	var a = new A();
	proclaim.deepEqual(Object.getOwnPropertyNames(a), ["foo"]);
});

it('throws an error when the arg is undefined or null', function() {
	proclaim.throws(function () {
		Object.getOwnPropertyNames(undefined);
	});
	proclaim.throws(function () {
		Object.getOwnPropertyNames(null);
	});
});

it('returns an empty array for booleans and numbers', function() {
	proclaim.deepEqual(Object.getOwnPropertyNames(true), []);
	proclaim.deepEqual(Object.getOwnPropertyNames(42), []);
});

it('splits a string into an array', function() {
	proclaim.deepEqual(Object.getOwnPropertyNames('foo'), ['0', '1', '2', 'length']);
});
