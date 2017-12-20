/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Number.isFinite, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Number.isFinite.length, 1);
});

it('returns true with finite values', function () {
	proclaim.equal(Number.isFinite(0), true);
	proclaim.equal(Number.isFinite(2e64), true);
});

it('retuns false for infinite values', function () {
	proclaim.equal(Number.isFinite("0"), false);
	proclaim.equal(Number.isFinite(null), false);
	proclaim.equal(Number.isFinite(undefined), false);
	proclaim.equal(Number.isFinite(Infinity), false);
	proclaim.equal(Number.isFinite(-Infinity), false);
});
