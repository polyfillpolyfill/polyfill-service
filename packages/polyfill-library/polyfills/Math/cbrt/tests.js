/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.cbrt);
});

it('has correct arity', function () {
	proclaim.arity(Math.cbrt, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.cbrt, 'cbrt');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'cbrt');
});

it('works as expected', function(){
	proclaim.isNaN(Math.cbrt(NaN));
	proclaim.strictEqual(1/Math.cbrt(0), Infinity);
	proclaim.strictEqual(1/Math.cbrt(-0), -Infinity);
	proclaim.strictEqual(Math.cbrt(Infinity), Infinity);
	proclaim.strictEqual(Math.cbrt(-Infinity), -Infinity);
	proclaim.strictEqual(Math.cbrt(-8), -2);
	proclaim.strictEqual(Math.cbrt(8), 2);
});
