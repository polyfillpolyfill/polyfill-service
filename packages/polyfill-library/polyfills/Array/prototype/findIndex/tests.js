/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.findIndex);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.findIndex, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.findIndex, 'findIndex');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'findIndex');
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
