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
	this.timeout(10000);

	proclaim.strictEqual(String.fromCodePoint(''), '\0');
	proclaim.strictEqual(String.fromCodePoint(), '');
	proclaim.strictEqual(String.fromCodePoint(-0), '\0');
	proclaim.strictEqual(String.fromCodePoint(0), '\0');
	proclaim.strictEqual(String.fromCodePoint(0x1D306), '\uD834\uDF06');
	proclaim.strictEqual(String.fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
	proclaim.strictEqual(String.fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
	proclaim.strictEqual(String.fromCodePoint(false), '\0');
	proclaim.strictEqual(String.fromCodePoint(null), '\0');
	proclaim.throws(function () {
		String.fromCodePoint('_');
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint('+Infinity');
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint('-Infinity');
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(-1);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(0x10FFFF + 1);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(3.14);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(3e-2);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(-Infinity);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(Infinity);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(NaN);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(undefined);
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint({});
	}, RangeError);
	proclaim.throws(function () {
		String.fromCodePoint(/./);
	}, RangeError);
	var tmp = 0x60;
	proclaim.strictEqual(String.fromCodePoint({
		valueOf: function () {
			return ++tmp;
		}
	}), 'a');
	proclaim.strictEqual(tmp, 0x61);
	proclaim.doesNotThrow(function() {
		var result = [];
		// one code unit per item in array
		for (var i =0; i < 49152; i++) {
			result.push(0);
		}
		String.fromCodePoint.apply(null, result);
	});
	proclaim.doesNotThrow(function() {
		var result = [];
		// two code units per item in array
		for (var i =0; i < 49152; i++) {
			result.push(0xFFFF + 1);
		}
		String.fromCodePoint.apply(null, result);
	});
});
