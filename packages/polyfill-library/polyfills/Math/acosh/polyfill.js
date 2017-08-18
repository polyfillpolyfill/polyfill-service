// 20.2.2.3. Math.acosh ( x )
CreateMethodProperty(Math, 'acosh', function acosh(x) {
	// If x is NaN, the result is NaN.
	if (isNaN(x)) {
		return NaN;
	}
	// If x is less than 1, the result is NaN.
	if (x < 1) {
		return NaN;
	}
	// If x is 1, the result is +0.
	if (x === 1) {
		return 0;
	}
	// If x is +∞, the result is +∞.
	if (x === Infinity) {
		return Infinity;
	}
	return Math.log(x + Math.sqrt(x * x - 1));
});
