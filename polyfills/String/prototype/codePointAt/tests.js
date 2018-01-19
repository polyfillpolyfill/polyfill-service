/* eslint-env mocha, browser*/
/* global proclaim, it */
'use strict';
var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

// Tests ported from https://github.com/es-shims/es6-shim/blob/master/test/string.js#L496-L541

var hasStrictMode = (function () {
	return this === null;
}).call(null);

var ifHasStrictModeIt = hasStrictMode ? it : it.skip;

describe('#codePointAt()', function () {

	it('is a function', function () {
		proclaim.isFunction(String.prototype.codePointAt);
	});


	ifSupportsDescriptors('is not enumerable', function () {
		proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(String.prototype.codePointAt));
	});

	it('has the right arity', function () {
		proclaim.strictEqual(String.prototype.codePointAt.length, 1);
	});

	ifHasStrictModeIt('should throw a TypeError when called on null or undefined', function () {
		proclaim.throws(function () {
			String.prototype.codePointAt.call(undefined);
		}, TypeError);

		proclaim.throws(function () {
			String.prototype.codePointAt.call(null);
		}, TypeError);

		proclaim.throws(function () {
			String.prototype.codePointAt.apply(undefined);
		}, TypeError);

		proclaim.throws(function () {
			String.prototype.codePointAt.apply(null);
		}, TypeError);
	});

	it('should work', function () {
		var str = 'abc';
		proclaim.strictEqual(str.codePointAt(0), 97);
		proclaim.strictEqual(str.codePointAt(1), 98);
		proclaim.strictEqual(str.codePointAt(2), 99);
	});

	it('should work with unicode', function () {
		proclaim.strictEqual('\u2500'.codePointAt(0), 0x2500);
		proclaim.strictEqual('\ud800\udc00'.codePointAt(0), 0x10000);
		proclaim.strictEqual('\udbff\udfff'.codePointAt(0), 0x10ffff);
		proclaim.strictEqual('\ud800\udc00\udbff\udfff'.codePointAt(0), 0x10000);
		proclaim.strictEqual('\ud800\udc00\udbff\udfff'.codePointAt(1), 0xdc00);
		proclaim.strictEqual('\ud800\udc00\udbff\udfff'.codePointAt(2), 0x10ffff);
		proclaim.strictEqual('\ud800\udc00\udbff\udfff'.codePointAt(3), 0xdfff);
	});

	it('should return undefined when pos is negative or too large', function () {
		var str = 'abc';
		proclaim.isUndefined(str.codePointAt(-1));
		proclaim.isUndefined(str.codePointAt(str.length));
	});
});
