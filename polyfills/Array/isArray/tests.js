/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.isArray);
});

it('has correct arity', function () {
	proclaim.arity(Array.isArray, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.isArray, 'isArray');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array, 'isArray');
});

describe('returns true with', function () {
	it('arrays', function () {
		proclaim.equal(Array.isArray(new Array), true);
		proclaim.equal(Array.isArray(new Array(10)), true);
		proclaim.equal(Array.isArray([]), true);
		proclaim.equal(Array.isArray(['a', 'b', 'c']), true);
	});
});

describe('returns false with', function () {
	it('empty, null, or undefined', function () {
		proclaim.equal(Array.isArray(), false);
		proclaim.equal(Array.isArray(undefined), false);
		proclaim.equal(Array.isArray(null), false);
	});

	it('arguments', function () {
		var args = (function () {
			return arguments;
		}('a', 'b', 'c'));

		proclaim.equal(Array.isArray(args), false);
	});

	it('primatives', function () {
		proclaim.equal(Array.isArray(true), false);
		proclaim.equal(Array.isArray('abc'), false);
		proclaim.equal(Array.isArray(123), false);
	});

	it('instances', function () {
		proclaim.equal(Array.isArray(new Date), false);
		proclaim.equal(Array.isArray(new Object), false);
		proclaim.equal(Array.isArray(new Function), false);
		proclaim.equal(Array.isArray(new Number), false);
		proclaim.equal(Array.isArray(new String), false);
	});

	it('constructors', function () {
		proclaim.equal(Array.isArray(Math), false);
		proclaim.equal(Array.isArray(Object), false);
		proclaim.equal(Array.isArray(Number), false);
		proclaim.equal(Array.isArray(String), false);
	});

	it('objects', function () {
		proclaim.equal(Array.isArray({}), false);
		proclaim.equal(Array.isArray({
			0: 'a',
			1: 'b',
			2: 'c',
			length: 3
		}), false);
	});

	it('objects as array subclasses', function () {
		function NotArray() {}

		NotArray.prototype = new Array;

		proclaim.equal(Array.isArray(new NotArray), false);
	});

	it('functions', function () {
		proclaim.equal(Array.isArray(function () {
			return [];
		}), false);
	});

	it('regular expressions', function () {
		proclaim.equal(Array.isArray(/abc/), false);
	});
});
