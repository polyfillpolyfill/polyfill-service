Math.imul = function imul(x) {
	var
	ah  = (a >>> 16) & 0xffff,
	al = a & 0xffff,
	bh  = (b >>> 16) & 0xffff,
	bl = b & 0xffff;

	return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
};
