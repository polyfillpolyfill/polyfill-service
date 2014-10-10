Math.sign = function sign(x) {
	return !(x = +x) ? x : x > 0 ? 1 : -1;
};
