Math.sign = function sign(x) {
	return !(x = Number(x)) ? x : x > 0 ? 1 : -1;
};
