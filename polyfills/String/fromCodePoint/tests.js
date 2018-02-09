/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.fromCodePoint);
});

it('has correct arity', function () {
	proclaim.arity(String.fromCodePoint, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.fromCodePoint, 'fromCodePoint');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String, 'fromCodePoint');
});


it('works as expected', function () {
	var fromCodePoint;
	var tmp;
	// var counter;
	// var result;
	fromCodePoint = String.fromCodePoint;
	proclaim.strictEqual(fromCodePoint(''), '\0');
	proclaim.strictEqual(fromCodePoint(), '');
	proclaim.strictEqual(fromCodePoint(-0), '\0');
	proclaim.strictEqual(fromCodePoint(0), '\0');
	proclaim.strictEqual(fromCodePoint(0x1D306), '\uD834\uDF06');
	proclaim.strictEqual(fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
	proclaim.strictEqual(fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
	proclaim.strictEqual(fromCodePoint(false), '\0');
	proclaim.strictEqual(fromCodePoint(null), '\0');
	proclaim.throws(function () {
		fromCodePoint('_');
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint('+Infinity');
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint('-Infinity');
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(-1);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(0x10FFFF + 1);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(3.14);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(3e-2);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(-Infinity);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(Infinity);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(NaN);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(undefined);
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint({});
	}, RangeError);
	proclaim.throws(function () {
		fromCodePoint(/./);
	}, RangeError);
	tmp = 0x60;
	proclaim.strictEqual(fromCodePoint({
		valueOf: function () {
			return ++tmp;
		}
	}), 'a');
	proclaim.strictEqual(tmp, 0x61);
	// counter = Math.pow(2, 15) * 3 / 2;
	// result = [];
	// while (--counter >= 0) {
	// 	result.push(0);
	// }
	// fromCodePoint.apply(null, result);
	// counter = Math.pow(2, 15) * 3 / 2;
	// result = [];
	// while (--counter >= 0) {
	// 	result.push(0xFFFF + 1);
	// }
	// fromCodePoint.apply(null, result);
});
