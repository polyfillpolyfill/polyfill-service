/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.sinh);
});

it('has correct arity', function () {
	proclaim.arity(Math.sinh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.sinh, 'sinh');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'sinh');
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.sinh()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.sinh(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.sinh(Infinity), Infinity);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.sinh(-Infinity), -Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.sinh(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.sinh(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.sinh(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.sinh(1), 1.1752011936438014);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.sinh(0.5), 0.5210953054937474);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.sinh(-1), -1.1752011936438014);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.sinh(-0.5), -0.5210953054937474);
	proclaim.strictEqual(Math.sinh(-2e-17), -2e-17);
});
