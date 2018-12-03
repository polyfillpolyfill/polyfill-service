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
	proclaim.isNotEnumerable(String.prototype, 'startsWith');
});

it('works as expected', function () {
	proclaim.isTrue('undefined'.startsWith());
	proclaim.isFalse('undefined'.startsWith(null));
	proclaim.isTrue('abc'.startsWith(''));
	proclaim.isTrue('abc'.startsWith('a'));
	proclaim.isTrue('abc'.startsWith('ab'));
	proclaim.isFalse('abc'.startsWith('bc'));
	proclaim.isTrue('abc'.startsWith('', NaN));
	proclaim.isTrue('abc'.startsWith('a', -1));
	proclaim.isFalse('abc'.startsWith('a', 1));
	proclaim.isFalse('abc'.startsWith('a', Infinity));
	proclaim.isTrue('abc'.startsWith('b', true));
	proclaim.isTrue('abc'.startsWith('a', 'x'));
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
