
// Math.clz32
Math.clz32 = function clz32(x) {
	var value = Number(x) >>> 0;

	return value ? 32 - value.toString(2).length : 32;
};
