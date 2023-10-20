
// Math.atanh
/* global CreateMethodProperty */
// 20.2.2.7. Math.atanh ( x )
CreateMethodProperty(Math, 'atanh', function atanh(x) {
	// If x is NaN, the result is NaN.
	if (isNaN(x)) {
		return NaN;
	}
	// If x is less than -1, the result is NaN.
	if (x < -1) {
		return NaN;
	}
	// If x is greater than 1, the result is NaN.
	if (x > 1) {
		return NaN;
	}
	// If x is -1, the result is -∞.
	if (x === -1) {
		return -Infinity;
	}
	// If x is +1, the result is +∞.
	if (x === 1) {
		return Infinity;
	}
	// If x is +0, the result is +0.
	if (x === 0 && 1/x === Infinity) {
		return 0;
	}
	// If x is -0, the result is -0.
	if (x === 0 && 1/x === -Infinity) {
		return -0;
	}
	return Math.log((1 + x) / (1 - x)) / 2;
});
