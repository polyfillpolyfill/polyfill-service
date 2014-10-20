// Math.acosh(x)
//
// Returns an implementation-dependent approximation of the inverse hyperbolic
// cosine of x  (See: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.acosh)

it("Should return NaN when using a number less than one", function() {
	var x = Math.acosh(-1);
	var y = Math.acosh(0.99);
	expect(x.toString()).to.be(NaN.toString());
	expect(y.toString()).to.be(NaN.toString());
});

it("Should return NaN if the parameter is NaN", function() {
	var x = Math.acosh(NaN);
	expect(x.toString()).to.be(NaN.toString());
});

it("Should return 0 if the parameter is 1", function() {
	var x = Math.acosh(1);
	expect(x).to.be(0);
});

it("Should return Number.POSITIVE_INFINITY if the parameter is Number.POSITIVE_INFINITY", function() {
	var x = Math.acosh(Number.POSITIVE_INFINITY);
	expect(x).to.be(Number.POSITIVE_INFINITY);
});

it("Should return an approximation of the inverse hyperbolic cosine of the parameter", function() {
	var x = Math.acosh(10.5);
	expect(x).to.be.within(3.03, 3.05);
});
