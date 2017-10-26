/* eslint-env mocha, browser*/
/* global proclaim, it */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.isSafeInteger, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.isSafeInteger.length, 1);
});

it('returns false if argument is not a number literal', function () {
	proclaim.isFalse(Number.isSafeInteger("1"));
	proclaim.isFalse(Number.isSafeInteger([1]));
	proclaim.isFalse(Number.isSafeInteger(new Number(42)));
	proclaim.isFalse(Number.isSafeInteger(false));
	proclaim.isFalse(Number.isSafeInteger(true));
	proclaim.isFalse(Number.isSafeInteger(undefined));
	proclaim.isFalse(Number.isSafeInteger(null));
	proclaim.isFalse(Number.isSafeInteger());
});

it('returns false if argument is an Infinity', function () {
	proclaim.isFalse(Number.isSafeInteger(Infinity));
	proclaim.isFalse(Number.isSafeInteger(-Infinity));
});

it('returns false if argument is NaN', function () {
	proclaim.isFalse(Number.isSafeInteger(NaN));
});

it('returns false if argument is a number which is not an integer', function () {
	proclaim.isFalse(Number.isSafeInteger(1.1));
	proclaim.isFalse(Number.isSafeInteger(0.000001));
	proclaim.isFalse(Number.isSafeInteger(-0.000001));
	proclaim.isFalse(Number.isSafeInteger(11e-1));
});

it('returns false if argument is an unsafe integer', function () {
	proclaim.isFalse(Number.isSafeInteger(Math.pow(2, 53)));
	proclaim.isFalse(Number.isSafeInteger(-Math.pow(2, 53)));
});

it('returns true if argument is a safe integer', function () {
	proclaim.isTrue(Number.isSafeInteger(1), '1');
	proclaim.isTrue(Number.isSafeInteger(-1), '-1');
	proclaim.isTrue(Number.isSafeInteger(0), '0');
	proclaim.isTrue(Number.isSafeInteger(-0), '-0');
	proclaim.isTrue(Number.isSafeInteger(Math.pow(2, 52) - 1), 'Math.pow(2, 52) - 1');
	proclaim.isTrue(Number.isSafeInteger(-Math.pow(2, 52) + 1), '-Math.pow(2, 52) + 1');
});

it('is writable', function () {
	var NumberisSafeInteger = Number.isSafeInteger;
	Number.isSafeInteger = 1;
	proclaim.notEqual(Number.isSafeInteger, NumberisSafeInteger);
	proclaim.strictEqual(Number.isSafeInteger, 1);
});
