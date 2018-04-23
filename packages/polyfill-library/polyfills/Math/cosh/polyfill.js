/* global CreateMethodProperty */
// 20.2.2.1. 3Math.cosh ( x )
CreateMethodProperty(Math, 'cosh', function cosh(x) {
	// If x is NaN, the result is NaN.
	if (isNaN(x)) {
		return NaN;
	}
	// If x is +0, the result is 1.
	if (x === 0 && 1/x === Infinity) {
		return 1;
	}
	// If x is -0, the result is 1.
	if (x === 0 && 1/x === -Infinity) {
		return 1;
	}
	// If x is +∞, the result is +∞.
	if (x === Infinity) {
		return Infinity;
	}
	// If x is -∞, the result is +∞.
	if (x === -Infinity) {
		return Infinity;
	}
	x = Math.abs(x);
	if (x > 709) {
		var y = Math.exp(0.5 * x);
		return y / 2 * y;
	}
	var y = Math.exp(x);
	return (y + 1 / y) / 2;
});
