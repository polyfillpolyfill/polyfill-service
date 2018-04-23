// 7.1.6. ToUint32 ( argument )
function ToUint32(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (isNaN(number) || 1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return 0;
	}
	// 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
	var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
	// 4. Let int32bit be int modulo 2^32.
	var int32bit = int >>> 0;
	// 5. Return int32bit.
	return int32bit;
}
