// 7.1.11 ToUint8Clamp ( argument )
function ToUint8Clamp(argument) { // eslint-disable-line no-unused-vars
	// 1. Let number be ? ToNumber(argument).
	var number = Number(argument);
	// 2. If number is NaN, return +0.
	if (isNaN(number)) {
		return 0;
	}
	// 3. If number ≤ 0, return +0.
	if (number <= 0) {
		return 0;
	}
	// 4. If number ≥ 255, return 255.
	if (number >= 255) {
		return 255;
	}
	// 5. Let f be floor(number).
	var f = Math.floor(number);
	// 6. If f + 0.5 < number, return f + 1.
	if (f + 0.5 < number) {
		return f + 1;
	}
	// 7. If number < f + 0.5, return f.
	if (number < f + 0.5) {
		return f;
	}
	// 8. If f is odd, return f + 1.
	if ((f % 2) === 1) {
		return f + 1;
	}
	// 9. Return f.
	return f;
}
