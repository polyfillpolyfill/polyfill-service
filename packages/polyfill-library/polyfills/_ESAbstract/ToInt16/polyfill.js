// 7.1.5. ToInt16 ( argument )
function ToInt16(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (isNaN(number) || 1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return 0;
	}
	// 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
	var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
	// 4. Let int16bit be int modulo 2^16.
	var int16bit = int % Math.pow(2,16);
	// 5. If int16bit ≥ 2^15, return int16bit - 2^16; otherwise return int16bit.
	if (int16bit >= Math.pow(2,15)) {
		return int16bit - Math.pow(2,16);
	} else {
		return int16bit;
	}
}
