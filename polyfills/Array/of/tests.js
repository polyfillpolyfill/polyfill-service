/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.of, Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.of), 'of');
});

it('has correct argument length', function () {
	proclaim.equal(Array.of.length, 0);
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
