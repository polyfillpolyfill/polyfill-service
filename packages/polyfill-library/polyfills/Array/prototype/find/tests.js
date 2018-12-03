/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.find);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.find, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.find, 'find');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'find');
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
