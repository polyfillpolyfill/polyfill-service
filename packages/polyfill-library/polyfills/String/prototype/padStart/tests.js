/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.padStart);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.padStart, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.padStart, 'padStart');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'padStart');
});

it('works as expected', function () {
	proclaim.strictEqual('a'.padStart(), 'a');
	proclaim.strictEqual('a'.padStart(-1, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(0, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(1, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(5, ''), 'a');
	proclaim.strictEqual('a'.padStart(5, 'a'), 'aaaaa');
	proclaim.strictEqual('a'.padStart(5, 'bc'), 'bcbca');
	proclaim.strictEqual('a'.padStart(5, 'bcdef'), 'bcdea');
	proclaim.strictEqual('a'.padStart(5, 5), '5555a');
	proclaim.strictEqual('a'.padStart(5, { nil: 0 }), '[obja'); // String(x:Object) = [object Object]
	proclaim.strictEqual('a'.padStart(5, [0, 1, 2]), '0,1,a'); // String(x:Array)  = x.toString()
	proclaim.strictEqual('a'.padStart(10, [0, "hello!", 2]), '0,hello!,a');
	proclaim.strictEqual('a'.padStart(10), '         a');

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function(){
			String.prototype.padStart.call(null, 0);
		}, TypeError);
		proclaim.throws(function(){
			String.prototype.padStart.call(undefined, 0);
		}, TypeError);
	}
});
