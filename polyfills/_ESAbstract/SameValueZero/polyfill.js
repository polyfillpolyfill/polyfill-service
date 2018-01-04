/* global _ESAbstract */
// 7.2.11. SameValueZero ( x, y )
_ESAbstract.SameValueZero = function (x, y) { // eslint-disable-line no-unused-vars
	// 1. If Type(x) is different from Type(y), return false.
	if (_ESAbstract.Type(x) !== _ESAbstract.Type(y)) {
		return false;
	}
	// 2. If Type(x) is Number, then
	if (_ESAbstract.Type(x) === 'number') {
		// a. If x is NaN and y is NaN, return true.
		if (isNaN(x) && isNaN(y)) {
			return true;
		}
		// b. If x is +0 and y is -0, return true.
		if (1 / x === Infinity && 1 / y === -Infinity) {
			return true;
		}
		// c. If x is -0 and y is +0, return true.
		if (1 / x === -Infinity && 1 / y === Infinity) {
			return true;
		}
		// d. If x is the same Number value as y, return true.
		if (x === y) {
			return true;
		}
		// e. Return false.
		return false;
	}
	// 3. Return SameValueNonNumber(x, y).
	return _ESAbstract.SameValueNonNumber(x, y);
};
