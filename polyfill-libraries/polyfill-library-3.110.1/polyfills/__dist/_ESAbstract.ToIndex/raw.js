
// _ESAbstract.ToIndex
/* global ToInteger, ToLength, SameValueZero */
// 7.1.17. ToIndex ( value )
function ToIndex(value) { // eslint-disable-line no-unused-vars
	// 1. If value is undefined, then
	if (value === undefined) {
		// a. Let index be 0.
		var index = 0;
		// 2. Else,
	} else {
		// a. Let integerIndex be ? ToInteger(value).
		var integerIndex = ToInteger(value);
		// b. If integerIndex < 0, throw a RangeError exception.
		if (integerIndex < 0) {
			throw new RangeError("integerIndex < 0");
		}
		// c. Let index be ! ToLength(integerIndex).
		index = ToLength(integerIndex);
		// d. If SameValueZero(integerIndex, index) is false, throw a RangeError exception.
		if (SameValueZero(integerIndex, index) === false) {
			throw new RangeError("integerIndex < 0");
		}
	}
	// 3. Return index.
	return index;
}
