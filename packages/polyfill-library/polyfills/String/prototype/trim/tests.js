/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.trim);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.trim, 0);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.trim, 'trim');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'trim');
});

it('works as expected', function () {
	proclaim.strictEqual(' \n  q w e \n  '.trim(), 'q w e', 'removes whitespaces at left & right side of string');
	proclaim.strictEqual('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'.trim(), '', 'removes all whitespaces');
	// ECMAScript WhiteSpace intentionally excludes all code points that have the Unicode “White_Space” property but which are not classified in category "Space_Separator" ("Zs").
	proclaim.strictEqual('\u200b\u0085'.trim(), '\u200b\u0085', "shouldn't remove zero width space characters as they are not in the Zs Unicode category");
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.trim.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.trim.call(void 8, 0);
		}, TypeError);
	}
});

