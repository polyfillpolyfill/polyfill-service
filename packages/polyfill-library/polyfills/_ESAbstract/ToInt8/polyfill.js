// 7.1.5. ToInt8 ( argument )
function ToInt8(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (isNaN(number) || 1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return 0;
	}
	// 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
	var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
	// 4. Let int8bit be int modulo 2^8.
	var int8bit = int % Math.pow(2,8);
	// 5. If int8bit ≥ 2^7, return int8bit - 2^8; otherwise return int8bit.
	if (int8bit >= Math.pow(2,7)) {
		return int8bit - Math.pow(2,8);
	} else {
		return int8bit;
	}
}
