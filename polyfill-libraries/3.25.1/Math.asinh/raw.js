
// Math.asinh
Math.asinh = function asinh(x) {
	return x === -Infinity ? x : Math.log(x + Math.sqrt(x * x + 1));
};
