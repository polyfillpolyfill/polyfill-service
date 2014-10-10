Math.sinh = function sinh(x) {
	var y = Math.exp(x);

	return (y - 1 / y) / 2;
};
