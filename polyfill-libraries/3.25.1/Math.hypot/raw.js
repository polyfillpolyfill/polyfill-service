
// Math.hypot
Math.hypot = function hypot() {
	var args = arguments, index = -1, y = 0;

	while (++index in args && Math.abs(y) !== Infinity) {
		y += args[index] * args[index];
	}

	return Math.abs(y) === Infinity ? Infinity : Math.sqrt(y);
};
