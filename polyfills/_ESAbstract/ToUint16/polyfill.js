/* global _ESAbstract */
// 7.1.5. ToUInt16 ( argument )
_ESAbstract.ToUInt16 = function (argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (isNaN(number) || number === 0 || number === -0 || number === Infinity || number === -Infinity) {
		return 0;
	}
	// 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
	var int = ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
	// 4. Let int16bit be int modulo 2^16.
	var int16bit = int % Math.pow(2, 16);
	// 5. Return int16bit.
	return int16bit;
};
