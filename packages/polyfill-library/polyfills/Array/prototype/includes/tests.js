/* eslint-env mocha */
/* globals proclaim, Symbol */


it('is a function', function () {
	proclaim.isFunction(Array.prototype.includes);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.includes, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.includes, 'includes');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'includes');
});

it('handles arrays', function () {
	proclaim.equal([10, 11, 12, 13].includes(12), true);
	proclaim.equal([10, 11, 12, 13].includes(14), false);
	proclaim.equal([10, 11, 12, 13].includes(13, 4), false);
	proclaim.equal([10, 11, 12, 13].includes(13, -1), true);
});

it('handles arrays of strings', function () {
	proclaim.equal(['a', 'b', 'c'].includes('foo'), false);
	proclaim.equal(['1', '2', '3'].includes('foo'), false);
	proclaim.equal(['a', 'b', 'c'].includes(1), false);
	proclaim.equal(['1', '2', '3'].includes(3), false);
	proclaim.equal(['1', '2', '3'].includes('3'), true);
});

it('handles arrays using SameValueZero equality algorithm', function () {
	proclaim.equal([-0, 11, 12, 13].includes(+0), true);
	proclaim.equal([+0, 11, 12, 13].includes(-0), true);
	proclaim.equal([NaN, 11, 12, 13].includes(NaN), true);
});

it('handles array-like objects', function () {
	var
	// 3: 0 is ignored because length omits it
	object = { 0: NaN, 1: 11, 2: 12, 3: 13, length: 3 };

	proclaim.equal(Array.prototype.includes.call(object, 12), true);
	proclaim.equal(Array.prototype.includes.call(object, 13), false);
	proclaim.equal(Array.prototype.includes.call(object, 13, 3), false);
	proclaim.equal(Array.prototype.includes.call(object, 12, -1), true);
	proclaim.equal(Array.prototype.includes.call(object, NaN), true);
});

it('handles array-like objects with out-of-range lengths', function () {
	var
	object = { 0: 10, 1: 11, 2: 12, 3: 13, length: -Infinity };

	proclaim.equal(Array.prototype.includes.call(object, 10), false);
	proclaim.equal(Array.prototype.includes.call(object, 10), false);
});

it('works as expected', function () {
	var arr, o;
	arr = [1, 2, 3, -0, o = {}];
	proclaim.ok(arr.includes(1));
	proclaim.ok(arr.includes(-0));
	proclaim.ok(arr.includes(0));
	proclaim.ok(arr.includes(o));
	proclaim.ok(!arr.includes(4));
	proclaim.ok(!arr.includes(-0.5));
	proclaim.ok(!arr.includes({}));
	proclaim.ok(Array(1).includes(void 8));
	proclaim.ok([NaN].includes(NaN));
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			Array.prototype.includes.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			Array.prototype.includes.call(void 8, 0);
		}, TypeError);
	}
});
