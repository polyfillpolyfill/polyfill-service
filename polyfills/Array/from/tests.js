/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.from, Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.from), 'from');
});

it('has correct argument length', function () {
	proclaim.equal(Array.from.length, 1);
});

describe('returns an array with', function () {
	it('arrays', function () {
		proclaim.deepEqual(Array.from([]), []);
		proclaim.deepEqual(Array.from(['a', 'b', 'c']), ['a', 'b', 'c']);
	});

	it('fills holes in arrays', function () {
		var arr = [1, 2, 3];
		delete arr[1];
		/**
		 * These are unrolled as expect.js' eql doesn't work on
		 * arrays created with undefined elements.
		 * https://github.com/Automattic/expect.js/issues/140
		 */
		proclaim.deepEqual(Array.from(arr)[0], 1);
		proclaim.deepEqual(Array.from(arr)[1], undefined);
		proclaim.deepEqual(Array.from(arr)[2], 3);
		/* eslint-disable no-sparse-arrays */
		proclaim.deepEqual(Array.from([4, , 6])[1], undefined);
	});

	it('objects', function () {
		proclaim.deepEqual(Array.from({}), []);
		proclaim.deepEqual(Array.from({ 0: 'a' }), []);
		proclaim.deepEqual(Array.from({ 0: 'a', 1: 'b', 2: 'c', length: 3 }), ['a', 'b', 'c']);
	});

	it('Iterable', function () {
		var set;
		var setIterator;
		var map;
		var mapIterator;

		if ('Map' in window && 'entries' in Map.prototype) {

			map = new Map();
			map.set(1,2);
			map.set(3,4);
			mapIterator = map.values();

			if (typeof mapIterator.next === 'function') {

				// Test map iterable
				proclaim.deepEqual(Array.from(mapIterator), [2,4]);

				it('can convert from Map', function () {
					proclaim.deepEqual(Array.from(map), [[1,2],[3,4]]);
				});
			}
		}

		if ('Set' in window && 'values' in Set.prototype) {

			set = new Set();
			set.add(1);
			set.add(2);
			set.add(3);
			set.add(4);
			setIterator = set.values();

			if (typeof setIterator.next === 'function') {

				// Test set iterable
				proclaim.deepEqual(Array.from(setIterator), [1,2,3,4]);

				it('can convert from Set', function () {
					proclaim.deepEqual(Array.from(set), [1,2,3,4]);
				});
			}
		}

		it('can convert from a user-defined iterator', function () {
			function iterator(cnt) {
				return {
					next: function () {
						return cnt === 0
							? {
								done: true
							}
							: {
								value: cnt--,
								done: false
							};
					}
				};
			}
			proclaim.deepEqual(Array.from(iterator(0)), []);
			proclaim.deepEqual(Array.from(iterator(1)), [1]);
			proclaim.deepEqual(Array.from(iterator(2)), [2, 1]);
			proclaim.deepEqual(Array.from(iterator(3)), [3, 2, 1]);
		});

	});

	it('strings', function () {
		proclaim.deepEqual(Array.from(''), []);
		proclaim.deepEqual(Array.from('abc'), ['a', 'b', 'c']);
	});

	it('numbers', function () {
		proclaim.deepEqual(Array.from(-Infinity), []);
		proclaim.deepEqual(Array.from(-3), []);
		proclaim.deepEqual(Array.from(-0), []);
		proclaim.deepEqual(Array.from(0), []);
		proclaim.deepEqual(Array.from(3), []);
		// REMOVAL: it may take a rediculous amount of time to calculate this
		// proclaim.deepEqual(Array.from(Infinity), []);
	});

	it('regular expressions', function () {
		proclaim.deepEqual(Array.from(/abc/), []);
	});

	it('objects with in-range lengths', function () {
		proclaim.equal(Array.from({ length: 0 }).length, 0);
		proclaim.equal(Array.from({ length: 3 }).length, 3);
		/**
		 * These are unrolled as expect.js' eql doesn't work on
		 * arrays created with undefined elements.
		 * https://github.com/Automattic/expect.js/issues/140
		 */
		proclaim.equal(Array.from({ length: 3 })[0], undefined);
		proclaim.equal(Array.from({ length: 3 })[1], undefined);
		proclaim.equal(Array.from({ length: 3 })[2], undefined);
		proclaim.equal(Array.from({ length: '+3' }).length, 3);
		// proclaim.equal(Array.from({ length: Infinity }).length, undefined);
	});

	it('objects with out-of-range lengths', function () {
		proclaim.equal(Array.from({ length: -0 }).length, 0);
		proclaim.equal(Array.from({ length: -3 }).length, 0);
		proclaim.equal(Array.from({ length: '-3' }).length, 0);
		proclaim.equal(Array.from({ length: -Infinity }).length, 0);
	});

	it('mapping functions', function () {
		function addElementAndIndex(element, index) {
			return element + index;
		}

		proclaim.deepEqual(Array.from(['a', 'b', 'c'], addElementAndIndex), ['a0', 'b1', 'c2']);
		proclaim.deepEqual(Array.from({ 0: 'a', 1: 'b', 3: 'c' }, addElementAndIndex), []);
		proclaim.deepEqual(Array.from({ 0: 'a', 1: 'b', 2: 'c', length: 3 }, addElementAndIndex), ['a0', 'b1', 'c2']);
		proclaim.deepEqual(Array.from('abc', addElementAndIndex), ['a0', 'b1', 'c2']);

		Array.from(['a', 'b', 'c'], function () {
			proclaim.equal(arguments.length, 2);
		});
	});

	it('this as an object', function () {
		var context = {};

		Array.from(['a', 'b', 'c'], function (value, index) {
			proclaim.isInstanceOf(this, Object);
			proclaim.strictEqual(this.valueOf(), context);
		}, context);
	});

	it('this as 42', function () {
		var context = 42;

		Array.from(['a', 'b', 'c'], function (value, index) {
			proclaim.isInstanceOf(this, Number);
			proclaim.strictEqual(this.valueOf(), 42);
		}, context);
	});

	it('this as false', function () {
		var context = false;

		Array.from(['a', 'b', 'c'], function (value, index) {
			proclaim.isInstanceOf(this, Boolean);
			proclaim.strictEqual(this.valueOf(), false);
		}, context);
	});
});

describe('throws', function () {
	it('non-iterable objects', function () {
		proclaim.throws(function () {
			Array.from();
		});

		proclaim.throws(function () {
			Array.from(undefined);
		});

		proclaim.throws(function () {
			Array.from(null);
		});
	});

	it('specified, invalid mapping functions', function () {
		proclaim.throws(function () {
			Array.from([1, 2, 3], null);
		});

		proclaim.throws(function () {
			Array.from([1, 2, 3], /\*/);
		});

		proclaim.throws(function () {
			Array.from([1, 2, 3], '');
		});

		proclaim.throws(function () {
			Array.from([1, 2, 3], []);
		});

		proclaim.throws(function () {
			Array.from([1, 2, 3], {});
		});

		proclaim.throws(function () {
			Array.from([1, 2, 3], 3);
		});
	});
});
