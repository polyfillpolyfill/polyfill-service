/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.prototype.findIndex, Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.prototype.findIndex), 'findIndex');
});

it('has correct argument length', function () {
	proclaim.equal(Array.prototype.findIndex.length, 1);
});

describe('callback', function () {
	it('has correct argument length', function () {
		[0].findIndex(function () {
			proclaim.equal(arguments.length, 3);
		});
	});
});

describe('applies callback correctly with', function () {
	function isPrime(element) {
		var start = 1;

		while (++start <= Math.sqrt(element)) {
			if (element % start < 1) {
				return false;
			}
		}

		return element > 1;
	}

	it('arrays', function () {
		proclaim.equal([4, 6, 7, 12].findIndex(isPrime), 2);
		proclaim.equal([4, 6, 8, 12].findIndex(isPrime), -1);
	});

	it('array-like objects', function () {
		var
		// 4: 13 is not considered as length omits this element
		objectA = { 0: 4, 1: 6, 2: 7, 3: 12, 4: 13, length: 3 },
		objectB = { 0: 4, 1: 6, 2: 8, 3: 12, 4: 13, length: 3 };

		proclaim.equal(Array.prototype.findIndex.call(objectA, isPrime), 2);
		proclaim.equal(Array.prototype.findIndex.call(objectB, isPrime), -1);
	});
});
