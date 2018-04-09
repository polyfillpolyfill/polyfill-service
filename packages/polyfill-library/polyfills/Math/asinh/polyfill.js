// 20.2.2.5. Math.asinh ( x )
CreateMethodProperty(Math, 'asinh', function asinh(x) {
	// If x is NaN, the result is NaN.
	if (isNaN(x)) {
		return NaN;
	}
	// If x is +0, the result is +0.
	if (x === 0 && 1/x === Infinity) {
		return 0;
	}
	// If x is -0, the result is -0.
	if (x === 0 && 1/x === -Infinity) {
		return -0;
	}
	// If x is +∞, the result is +∞.
	if (x === Infinity) {
		return Infinity;
	}
	// If x is -∞, the result is -∞.
	if (x === -Infinity) {
		return -Infinity;
	}
	return Math.log(x + Math.sqrt(x * x + 1));
});
