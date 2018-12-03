/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.padEnd);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.padEnd, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.padEnd, 'padEnd');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'padEnd');
});

it('works as expected', function () {
	proclaim.strictEqual('a'.padEnd(), 'a');
	proclaim.strictEqual('a'.padEnd(-1, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(0, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(1, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(2, 'bc'), 'ab');
	proclaim.strictEqual('a'.padEnd(5, ''), 'a');
	proclaim.strictEqual('a'.padEnd(5, 'a'), 'aaaaa');
	proclaim.strictEqual('a'.padEnd(5, 'bc'), 'abcbc');
	proclaim.strictEqual('a'.padEnd(5, 'bcdef'), 'abcde');
	proclaim.strictEqual('a'.padEnd(5, 5), 'a5555');
	proclaim.strictEqual('a'.padEnd(5, { nil: 0 }), 'a[obj');
	proclaim.strictEqual('a'.padEnd(5, [0, 1, 2]), 'a0,1,');
	proclaim.strictEqual('a'.padEnd(10, [0, "hello!", 2]), 'a0,hello!,');
	proclaim.strictEqual('a'.padEnd(10), 'a         ');

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.padEnd.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.padEnd.call(undefined, 0);
		}, TypeError);
	}
});
