/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.isInteger, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.isInteger.length, 1);
});

it('returns true with integer values', function () {
	proclaim.equal(Number.isInteger(0), true);
	proclaim.equal(Number.isInteger(1), true);
	proclaim.equal(Number.isInteger(-100000), true);
});

it('returns false for non integer values', function () {
	proclaim.equal(Number.isInteger(0.1), false);
	proclaim.equal(Number.isInteger(Math.PI), false);

	proclaim.equal(Number.isInteger(Infinity), false);
	proclaim.equal(Number.isInteger(-Infinity), false);
	proclaim.equal(Number.isInteger("10"), false);
	proclaim.equal(Number.isInteger(true), false);
	proclaim.equal(Number.isInteger(false), false);
	proclaim.equal(Number.isInteger([1]), false);
});
