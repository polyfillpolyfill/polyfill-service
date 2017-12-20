/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.parseFloat, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.parseFloat.length, 1);
});

it('returns NaN with NaN values', function () {
	proclaim.equal(Number.parseFloat('Hello').toString(), NaN.toString());
	proclaim.equal(Number.parseFloat('H546').toString(), NaN.toString());
});

it('returns 15 for valid numbers and non-number data types', function () {
	proclaim.equal(Number.parseFloat(15.45), 15.45);
  proclaim.equal(Number.parseFloat("15"), 15);
  proclaim.equal(Number.parseFloat("150e-1"), 15);
  proclaim.equal(Number.parseFloat("0.150e+2"), 15);
  proclaim.equal(Number.parseFloat("15.1px"), 15.1);
  proclaim.equal(Number.parseFloat("15.2"), 15.2);
});
