Math.cbrt = function cbrt(x) {
	var y = Math.pow(Math.abs(x), 1 / 3);

	return x < 0 ? -y : y;
};
