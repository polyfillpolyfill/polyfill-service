/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.log2);
});

it('has correct arity', function () {
	proclaim.arity(Math.log2, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.log2, 'log2');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'log2');
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.log2()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.log2(undefined)));
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.log2(''), Math.log2(0));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.log2(Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isNaN(Math.log2(NaN));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.log2(0), -Infinity);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.log2(-0), -Infinity);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.log2(1), 0);
	proclaim.strictEqual(Math.log2(5), 2.321928094887362);
	proclaim.strictEqual(Math.log2(50), 5.643856189774724);
	proclaim.strictEqual(Math.log2(1000), 9.965784284662087);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.log2(0.5), -1);
});

it('works as expected when called with negative integers', function () {
	proclaim.isNaN(Math.log2(-1));
});

it('works as expected when called with negative real numbers', function () {
	proclaim.isNaN(Math.log2(-1.5));
});
