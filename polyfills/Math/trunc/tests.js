/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.trunc);
});

it('has correct arity', function () {
	proclaim.arity(Math.trunc, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.trunc, 'trunc');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'trunc');
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.trunc()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.trunc(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.trunc(Infinity), Infinity);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.trunc(-Infinity), -Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.trunc(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.trunc(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.trunc(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.trunc(1), 1);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.trunc(0.5), 0);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.trunc(-1), -1);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.trunc(-0.5), -0);
	proclaim.strictEqual(Math.trunc(-2e-17), -0);
});
