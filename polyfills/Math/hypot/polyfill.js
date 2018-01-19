// 20.2.2.18. Math.hypot ( value1, value2, ...values )
CreateMethodProperty(Math, 'hypot', function hypot(value1, value2) {
	// If no arguments are passed, the result is +0.
	if (arguments.length === 0) {
		return 0;
	}
	var y = 0;
	for (var i = 0; i < arguments.length; ++i) {
		// If any argument is +∞, the result is +∞.
		if (arguments[i] === Infinity) {
			return Infinity;
		}

		// If any argument is -∞, the result is +∞.
		if (arguments[i] === -Infinity) {
			return Infinity;
		}

		// If no argument is +∞ or -∞, and any argument is NaN, the result is NaN.
		if (isNaN(arguments[i])) {
			return NaN;
		}

		// If all arguments are either +0 or -0, the result is +0.
		// Polyfill.io - The above step is handled in the math, 0^2 === 0.
		y += Math.pow(arguments[i], 2);
	}


	return Math.sqrt(y);
});
