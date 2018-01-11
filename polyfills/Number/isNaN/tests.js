/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.isNaN, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.isNaN.length, 1);
});

it('returns true with NaN values', function () {
	proclaim.equal(Number.isNaN(NaN), true);
	proclaim.equal(Number.isNaN(Number.NaN), true);
	proclaim.equal(Number.isNaN(0/0), true);
});

it('retuns false for valid numbers and non-number data types', function () {
	proclaim.equal(Number.isNaN("NaN"), false);
	proclaim.equal(Number.isNaN(undefined), false);
	proclaim.equal(Number.isNaN({}), false);
	proclaim.equal(Number.isNaN("blabla"), false);
	proclaim.equal(Number.isNaN(true), false);
	proclaim.equal(Number.isNaN(37), false);
	proclaim.equal(Number.isNaN("37"), false);
});
