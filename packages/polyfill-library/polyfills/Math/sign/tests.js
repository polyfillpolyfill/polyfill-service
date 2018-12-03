/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.sign);
});

it('has correct arity', function () {
	proclaim.arity(Math.sign, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.sign, 'sign');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'sign');
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.sign()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.sign(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.sign(Infinity), 1);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.sign(-Infinity), -1);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.sign(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.sign(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.sign(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.sign(1), 1);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.sign(0.5), 1);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.sign(-1), -1);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.sign(-0.5), -1);
});
