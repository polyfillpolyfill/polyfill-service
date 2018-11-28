/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.asinh);
});

it('has correct arity', function () {
	proclaim.arity(Math.asinh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.asinh, 'asinh');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'asinh');
});

it("Should return NaN if the parameter is NaN", function() {
	var x = Math.asinh(NaN);
	proclaim.equal(x.toString(), NaN.toString());
});

it("Should return 0 if the parameter is 0", function() {
	var x = Math.asinh(0);
	proclaim.equal(x, 0);
});

it("Should return Number.POSITIVE_INFINITY if the parameter is Number.POSITIVE_INFINITY", function() {
	var x = Math.asinh(Number.POSITIVE_INFINITY);
	proclaim.equal(x, Number.POSITIVE_INFINITY);
});

it("Should return Number.NEGATIVE_INFINITY if the parameter is Number.NEGATIVE_INFINITY", function() {
	var x = Math.asinh(Number.NEGATIVE_INFINITY);
	proclaim.equal(x, Number.NEGATIVE_INFINITY);
});

it("Should approximate the inverse hyperbolic sine of the parameter", function() {
	var x = Math.asinh(0.5);
	proclaim.lessThanOrEqual(x, 0.5);
	proclaim.greaterThanOrEqual(x, 0.4);
});
