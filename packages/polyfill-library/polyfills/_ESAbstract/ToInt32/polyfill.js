// 7.1.5. ToInt32 ( argument )
function ToInt32(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (isNaN(number) || 1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return 0;
	}
	// 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
	var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
	// 4. Let int32bit be int modulo 2^32.
	var int32bit = int % Math.pow(2,32);
	// 5. If int32bit ≥ 2^31, return int32bit - 2^32; otherwise return int32bit.
	if (int32bit >= Math.pow(2,31)) {
		return int32bit - Math.pow(2,32);
	} else {
		return int32bit;
	}
}
