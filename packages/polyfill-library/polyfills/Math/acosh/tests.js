/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.acosh);
});

it('has correct arity', function () {
	proclaim.arity(Math.acosh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.acosh, 'acosh');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Math, 'acosh');
});

it("Should return NaN when using a number less than one", function() {
	var x = Math.acosh(-1);
	var y = Math.acosh(0.99);
	proclaim.equal(x.toString(), NaN.toString());
	proclaim.equal(y.toString(), NaN.toString());
});

it("Should return NaN if the parameter is NaN", function() {
	var x = Math.acosh(NaN);
	proclaim.equal(x.toString(), NaN.toString());
});

it("Should return 0 if the parameter is 1", function() {
	var x = Math.acosh(1);
	proclaim.equal(x, 0);
});

it("Should return Number.POSITIVE_INFINITY if the parameter is Number.POSITIVE_INFINITY", function() {
	var x = Math.acosh(Number.POSITIVE_INFINITY);
	proclaim.equal(x, Number.POSITIVE_INFINITY);
});

it("Should return an approximation of the inverse hyperbolic cosine of the parameter", function() {
	var x = Math.acosh(10.5);
	proclaim.lessThanOrEqual(x, 3.05);
	proclaim.greaterThanOrEqual(x, 3.03);
});
