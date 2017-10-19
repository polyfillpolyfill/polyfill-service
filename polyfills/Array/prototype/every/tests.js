/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.prototype.every, Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.prototype.every), 'every');
});

it('has correct argument length', function () {
	proclaim.equal(Array.prototype.every.length, 1);
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
