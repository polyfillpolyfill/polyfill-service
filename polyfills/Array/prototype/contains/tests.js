/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Array.prototype.contains, Function);
});

// Skipped because contains is now just an alias to includes
it.skip('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(Array.prototype.contains), 'contains');
});

it('has correct argument length', function () {
	proclaim.equal(Array.prototype.contains.length, 1);
});

it('handles arrays', function () {
	proclaim.equal([10, 11, 12, 13].contains(12), true);
	proclaim.equal([10, 11, 12, 13].contains(14), false);
	proclaim.equal([10, 11, 12, 13].contains(13, 4), false);
	proclaim.equal([10, 11, 12, 13].contains(13, -1), true);
});

it('handles arrays of strings', function () {
	proclaim.equal(['a', 'b', 'c'].contains('foo'), false);
	proclaim.equal(['1', '2', '3'].contains('foo'), false);
	proclaim.equal(['a', 'b', 'c'].contains(1), false);
	proclaim.equal(['1', '2', '3'].contains(3), false);
	proclaim.equal(['1', '2', '3'].contains('3'), true);
});

it('handles arrays using SameValueZero equality algorithm', function () {
	proclaim.equal([-0, 11, 12, 13].contains(+0), true);
	proclaim.equal([+0, 11, 12, 13].contains(-0), true);
	proclaim.equal([NaN, 11, 12, 13].contains(NaN), true);
});

it('handles array-like objects', function () {
	var
	// 3: 0 is ignored because length omits it
	object = { 0: NaN, 1: 11, 2: 12, 3: 13, length: 3 };

	proclaim.equal(Array.prototype.contains.call(object, 12), true);
	proclaim.equal(Array.prototype.contains.call(object, 13), false);
	proclaim.equal(Array.prototype.contains.call(object, 13, 3), false);
	proclaim.equal(Array.prototype.contains.call(object, 12, -1), true);
	proclaim.equal(Array.prototype.contains.call(object, NaN), true);
});

it('handles array-like objects with out-of-range lengths', function () {
	var
	object = { 0: 10, 1: 11, 2: 12, 3: 13, length: -Infinity };

	proclaim.equal(Array.prototype.contains.call(object, 10), false);
	proclaim.equal(Array.prototype.contains.call(object, 10), false);
});
