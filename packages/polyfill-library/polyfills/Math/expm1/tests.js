/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.expm1);
});

it('has correct arity', function () {
	proclaim.arity(Math.expm1, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.expm1, 'expm1');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'expm1');
});

it('works as expected', function () {
	proclaim.isNaN(Math.expm1(NaN));
	proclaim.isNaN(Math.expm1(function() {}));
	proclaim.isNaN(Math.expm1({}));
	proclaim.strictEqual(1/Math.expm1(0), Infinity);
	proclaim.strictEqual(1/Math.expm1(-0), -Infinity);
	proclaim.strictEqual(Math.expm1(Infinity), Infinity);
	proclaim.strictEqual(Math.expm1(-Infinity), -1);
	proclaim.strictEqual(Math.expm1(709.8), Infinity);
	proclaim.strictEqual(Math.expm1(0), 0);
	proclaim.strictEqual(Math.expm1(Math.pow(2, -55)), Math.pow(2, -55));
	proclaim.isFalse(Math.expm1(10) < 22025.4657948067165168);
	proclaim.isFalse(Math.expm1(10) > 22025.465794806719);
});
