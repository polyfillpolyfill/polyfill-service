/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.log1p);
});

it('has correct arity', function () {
	proclaim.arity(Math.log1p, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.log1p, 'log1p');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'log1p');
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.log1p()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.log1p(undefined)));
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.log1p(''), Math.log1p(0));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.log1p(Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.log1p(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.log1p(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.log1p(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.log1p(1), 0.6931471805599453);
	proclaim.strictEqual(Math.log1p(5), 1.791759469228055);
	proclaim.strictEqual(Math.log1p(50), 3.9318256327243257);
	proclaim.strictEqual(Math.log1p(1000), 6.90875477931522);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.log1p(0.5), 0.4054651081081644);
	proclaim.strictEqual(Math.log1p(1.5), 0.9162907318741551);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.log1p(-1), -Infinity);
	proclaim.isTrue(isNaN(Math.log1p(-2)));
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.log1p(-0.5), -0.6931471805599453);
	proclaim.isTrue(isNaN(Math.log1p(-1.5)));
	proclaim.strictEqual(Math.log1p(-0.1), -0.10536051565782631);
	proclaim.strictEqual(Math.log1p(-0.9), -2.302585092994046);
});
