/* eslint-env mocha */
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(String.prototype.endsWith);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.endsWith, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.endsWith, 'endsWith');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String.prototype, 'endsWith');
});

it('works as expected', function () {
	proclaim.isFalse('a'.endsWith('aa'));
	proclaim.isFalse('a'.endsWith('ab'));
	proclaim.isTrue('aa'.endsWith('a'));
	proclaim.isFalse('ab'.endsWith('a'));
	proclaim.isTrue('ab'.endsWith('ab'));
	proclaim.isTrue('ab'.endsWith('b'));

	var re, O;
	proclaim.isTrue('undefined'.endsWith());
	proclaim.isFalse('undefined'.endsWith(null));
	proclaim.isTrue('abc'.endsWith(''));
	proclaim.isTrue('abc'.endsWith('c'));
	proclaim.isTrue('abc'.endsWith('bc'));
	proclaim.isFalse('abc'.endsWith('ab'));
	proclaim.isTrue('abc'.endsWith('', NaN));
	proclaim.isFalse('abc'.endsWith('c', -1));
	proclaim.isTrue('abc'.endsWith('a', 1));
	proclaim.isTrue('abc'.endsWith('c', Infinity));
	proclaim.isTrue('abc'.endsWith('a', true));
	proclaim.isFalse('abc'.endsWith('c', 'x'));
	proclaim.isFalse('abc'.endsWith('a', 'x'));
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.endsWith.call(null, '.');
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.endsWith.call(undefined, '.');
		}, TypeError);
	}
	re = /./;
	proclaim.throws(function () {
		'/./'.endsWith(re);
	}, TypeError);
	if ('Symbol' in window && 'match' in Symbol) {
		re[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : undefined] = false;
		proclaim.isTrue('/./'.endsWith(re));
	}
	O = {};
	proclaim.isTrue('[object Object]'.endsWith(O));
	if ('Symbol' in window && 'iterator' in Symbol) {
		O[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : undefined] = true;
		proclaim.throws(function () {
			'[object Object]'.endsWith(O);
		}, TypeError);
	}
});

