// String.prototype.repeat
String.prototype.repeat = function repeat(count) {
	if (count < 0 || count >= Infinity) throw new Error('Out of range');

	return (new Array(parseInt(count + 1, 10))).join(this);
};
