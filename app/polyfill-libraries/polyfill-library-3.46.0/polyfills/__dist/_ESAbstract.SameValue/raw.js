
// _ESAbstract.SameValue
/* global Type, SameValueNonNumber */
// 7.2.10. SameValue ( x, y )
function SameValue(x, y) { // eslint-disable-line no-unused-vars
	// 1. If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) {
		return false;
	}
	// 2. If Type(x) is Number, then
	if (Type(x) === 'number') {
		// a. If x is NaN and y is NaN, return true.
		if (isNaN(x) && isNaN(y)) {
			return true;
		}
		// Polyfill.io - 0 === -0 is true, but they are not the same value.
		// b. If x is +0 and y is -0, return false.
		// c. If x is -0 and y is +0, return false.
		if (x === 0 && y === 0 && 1/x !== 1/y) {
			return false;
		}
		// d. If x is the same Number value as y, return true.
		if (x === y) {
			return true;
		}
		// e. Return false.
		return false;
	}
	// 3. Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}
