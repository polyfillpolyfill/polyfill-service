/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.codePointAt);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.codePointAt, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.codePointAt, 'codePointAt');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String.prototype, 'codePointAt');
});

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

it('works as expected', function () {
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(''), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt('_'), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(-Infinity), undefined);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(-1), undefined);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(-0), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(0), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(3), 0x1D306);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(4), 0xDF06);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(5), 0x64);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(42), undefined);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(Infinity), undefined);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(Infinity), undefined);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(NaN), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(false), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(null), 0x61);
	proclaim.strictEqual('abc\uD834\uDF06def'.codePointAt(undefined), 0x61);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(''), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt('1'), 0xDF06);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt('_'), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(-1), undefined);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(-0), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(0), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(1), 0xDF06);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(42), undefined);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(false), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(null), 0x1D306);
	proclaim.strictEqual('\uD834\uDF06def'.codePointAt(undefined), 0x1D306);
	proclaim.strictEqual('\uD834abc'.codePointAt(''), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt('_'), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(-1), undefined);
	proclaim.strictEqual('\uD834abc'.codePointAt(-0), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(0), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(false), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(NaN), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(null), 0xD834);
	proclaim.strictEqual('\uD834abc'.codePointAt(undefined), 0xD834);
	proclaim.strictEqual('\uDF06abc'.codePointAt(''), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt('_'), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(-1), undefined);
	proclaim.strictEqual('\uDF06abc'.codePointAt(-0), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(0), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(false), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(NaN), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(null), 0xDF06);
	proclaim.strictEqual('\uDF06abc'.codePointAt(undefined), 0xDF06);
	if (hasStrictMode) {
		proclaim.throws(function () {
			String.prototype.codePointAt.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.codePointAt.call(undefined, 0);
		}, TypeError);
	}
});

