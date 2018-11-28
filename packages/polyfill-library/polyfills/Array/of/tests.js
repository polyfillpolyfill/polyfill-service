/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.of);
});

it('has correct arity', function () {
	proclaim.arity(Array.of, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.of, 'of');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array, 'of');
});

describe('returns an array with', function () {
	var array, object;

	it('one string', function () {
		array = Array.of('abc');

		proclaim.isInstanceOf(array, Array);
		proclaim.equal(array.length, 1);
		proclaim.equal(array[0], 'abc');
	});

	it('three strings', function () {
		array = Array.of('a', 'b', 'c');

		proclaim.isInstanceOf(array, Array);
		proclaim.equal(array.length, 3);
		proclaim.equal(array[0], 'a');
		proclaim.equal(array[1], 'b');
		proclaim.equal(array[2], 'c');
	});

	it('one number', function () {
		array = Array.of(123);

		proclaim.isInstanceOf(array, Array);
		proclaim.equal(array.length, 1);
		proclaim.equal(array[0], 123);
	});

	it('one object', function () {
		object = {
			0: 'a',
			1: 'b',
			2: 'c',
			length: 3
		};
		array = Array.of(object);

		proclaim.isInstanceOf(array, Array);
		proclaim.equal(array.length, 1);
		proclaim.equal(array[0], object);
	});
});
