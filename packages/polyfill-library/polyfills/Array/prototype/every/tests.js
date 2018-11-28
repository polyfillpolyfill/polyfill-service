/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.every);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.every, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.every, 'every');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'every');
});

describe('callback', function () {
	it('has correct argument length', function () {
		[10, 11, 12].every(function () {
			proclaim.equal(arguments.length, 3);
		});
	});
});

describe('applies callback correctly with', function () {
	function elementIsGreaterThan9(element) {
		return element > 9;
	}

	function elementIsGreaterThan10(element) {
		return element > 10;
	}

	it('arrays', function () {
		proclaim.equal([10, 11, 12].every(elementIsGreaterThan9), true);
		proclaim.equal([10, 11, 12].every(elementIsGreaterThan10), false);
	});

	it('array-like objects', function () {
		var
		// 3: 0 is ignored because length omits it
		object = { 0: 10, 1: 11, 2: 12, 3: 0, length: 3 };

		proclaim.equal(Array.prototype.every.call(object, elementIsGreaterThan9), true);
		proclaim.equal(Array.prototype.every.call(object, elementIsGreaterThan10), false);
	});
});
