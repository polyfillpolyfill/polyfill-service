/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.parseInt, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.parseInt.length, 2);
});

it('returns NaN with NaN values', function () {
	proclaim.equal(Number.parseInt('Hello', 8).toString(), NaN.toString());
	proclaim.equal(Number.parseInt('546', 2).toString(), NaN.toString());
});

it('returns 15 for valid numbers and non-number data types', function () {
	proclaim.equal(Number.parseInt(15, 10), 15);
	proclaim.equal(Number.parseInt("15", 10), 15);
  proclaim.equal(Number.parseInt("15"), 15);
  proclaim.equal(Number.parseInt("15px"), 15);
  proclaim.equal(Number.parseInt("15.2"), 15);
  proclaim.equal(Number.parseInt("0xf"), 15);
});
