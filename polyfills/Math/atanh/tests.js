/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.atanh);
});

it('has correct arity', function () {
	proclaim.arity(Math.atanh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.atanh, 'atanh');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'atanh');
});

it('works as expected', function () {
	proclaim.isNaN(Math.atanh(NaN));
	proclaim.isNaN(Math.atanh(-1.000000000001));
	proclaim.isNaN(Math.atanh(1.000000000001));
	proclaim.strictEqual(Math.atanh(-1), -Infinity);
	proclaim.strictEqual(Math.atanh(1), Infinity);
	proclaim.strictEqual(1/Math.atanh(0), Infinity);
	proclaim.strictEqual(1/Math.atanh(-0), -Infinity);
});
