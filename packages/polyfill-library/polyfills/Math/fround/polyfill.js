Object.defineProperty(Math, 'fround', function (x) {
	if (isNaN(x)) {
		return NaN;
	}
	if (1 / x === +Infinity || 1 / x === -Infinity || x === +Infinity || x === -Infinity) {
		return x;
	}
	return (new Float32Array([x]))[0];
});
