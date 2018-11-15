/* eslint-env mocha */
/* globals proclaim */
 it('is a function', function () {
	proclaim.isFunction(Math.imul);
});
 it('has correct arity', function () {
	proclaim.arity(Math.imul, 2);
});
 it('has correct name', function () {
	proclaim.hasName(Math.imul, 'imul');
});
 it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'imul');
});
 it('works as expected when called with no arguments', function () {
	proclaim.strictEqual(Math.imul(), 0);
});
 it('works as expected when called with one argument', function () {
	proclaim.strictEqual(Math.imul(1), 0);
});
 it('works as expected when called with undefined arguments', function () {
	proclaim.strictEqual(Math.imul(undefined, undefined), 0);
});
 it('works as expected when called with undefined and a number', function () {
	proclaim.strictEqual(Math.imul(undefined, 1), 0);
	proclaim.strictEqual(Math.imul(1, undefined), 0);
});
 it('works as expected when called with boolean arguments', function () {
	proclaim.strictEqual(Math.imul(false, 1), 0);
	proclaim.strictEqual(Math.imul(1, false), 0);
	proclaim.strictEqual(Math.imul(false, false), 0);
	proclaim.strictEqual(Math.imul(true, 1), 1);
	proclaim.strictEqual(Math.imul(1, true), 1);
	proclaim.strictEqual(Math.imul(true, true), 1);
});
 it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.imul('str', 1), 0);
	proclaim.strictEqual(Math.imul(1, 'str'), 0);
});
 it('works as expected when called with array arguments', function () {
	proclaim.strictEqual(Math.imul([], 1), 0);
	proclaim.strictEqual(Math.imul(1, []), 0);
});
 it('works as expected when called with object arguments', function () {
	proclaim.strictEqual(Math.imul({}, 1), 0);
	proclaim.strictEqual(Math.imul(1, {}), 0);
});
 it('works as expected when first argument is larger than 2^31', function () {
	proclaim.strictEqual(Math.imul(Math.pow(2, 32) - 1, 1), -1);
	proclaim.strictEqual(Math.imul(Math.pow(2, 32) - 2, 1), -2);
});
 it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.imul(0, 0), 0);
	proclaim.strictEqual(Math.imul(2, 4), 8);
	proclaim.strictEqual(Math.imul(123, 456), 56088);
	proclaim.strictEqual(Math.imul(19088743, 4275878552), 602016552);
});
 it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.imul(0.1, 7), 0);
	proclaim.strictEqual(Math.imul(7, 0.1), 0);
	proclaim.strictEqual(Math.imul(0.9, 7), 0);
	proclaim.strictEqual(Math.imul(7, 0.9), 0);
	proclaim.strictEqual(Math.imul(1.1, 7), 7);
	proclaim.strictEqual(Math.imul(7, 1.1), 7);
	proclaim.strictEqual(Math.imul(1.9, 7), 7);
	proclaim.strictEqual(Math.imul(7, 1.9), 7);
});
 it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.imul(-123, 456), -56088);
	proclaim.strictEqual(Math.imul(123, -456), -56088);
	proclaim.strictEqual(Math.imul(-1, 8), -8);
	proclaim.strictEqual(Math.imul(-2, -2), 4);
	proclaim.strictEqual(Math.imul(-0, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0), 0);
});
 it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.imul(-0.1, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0.1), 0);
	proclaim.strictEqual(Math.imul(-0.9, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0.9), 0);
	proclaim.strictEqual(Math.imul(-1.1, 7), -7);
	proclaim.strictEqual(Math.imul(7, -1.1), -7);
	proclaim.strictEqual(Math.imul(-1.9, 7), -7);
	proclaim.strictEqual(Math.imul(7, -1.9), -7);
});