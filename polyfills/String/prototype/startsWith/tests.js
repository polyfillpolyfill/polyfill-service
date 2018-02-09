/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.startsWith);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.startsWith, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.startsWith, 'startsWith');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String.prototype, 'startsWith');
});

it('works as expected', function () {
	proclaim.ok('undefined'.startsWith());
	proclaim.ok(!'undefined'.startsWith(null));
	proclaim.ok('abc'.startsWith(''));
	proclaim.ok('abc'.startsWith('a'));
	proclaim.ok('abc'.startsWith('ab'));
	proclaim.ok(!'abc'.startsWith('bc'));
	proclaim.ok('abc'.startsWith('', NaN));
	proclaim.ok('abc'.startsWith('a', -1));
	proclaim.ok(!'abc'.startsWith('a', 1));
	proclaim.ok(!'abc'.startsWith('a', Infinity));
	proclaim.ok('abc'.startsWith('b', true));
	proclaim.ok('abc'.startsWith('a', 'x'));
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.startsWith.call(null, '.');
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.startsWith.call(undefined, '.');
		}, TypeError);
	}
	proclaim.throws(function(){
		'/./'.startsWith(/./);
	}, TypeError);
	proclaim.isTrue('[object Object]'.startsWith({}));
});
