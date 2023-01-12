
// Math.cosh
Math.cosh = function cosh(x) {
	var y = Math.exp(x);

	return (y + 1 / y) / 2;
};
