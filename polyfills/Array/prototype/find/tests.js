/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.prototype.find, Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.prototype.find), 'find');
});

it('has correct argument length', function () {
	proclaim.equal(Array.prototype.find.length, 1);
});

describe('callback', function () {
	it('has correct argument length', function () {
		[0].find(function () {
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
		proclaim.equal([4, 6, 7, 12].find(isPrime), 7);
		proclaim.equal([4, 6, 8, 12].find(isPrime), undefined);
	});

	it('array-like objects', function () {
		var
		// 4: 13 is ignored because length omits it
		objectA = { 0: 4, 1: 6, 2: 7, 3: 12, 4: 13, length: 4 },
		objectB = { 0: 4, 1: 6, 2: 8, 3: 12, 4: 13, length: 4 };

		proclaim.equal(Array.prototype.find.call(objectA, isPrime), 7);
		proclaim.equal(Array.prototype.find.call(objectB, isPrime), undefined);
	});
});
