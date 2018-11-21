/* global CreateMethodProperty, ToInteger, Type */
// 20.1.2.3. Number.isInteger ( number )
CreateMethodProperty(Number, 'isInteger', function isInteger(number) {
	// 1. If Type(number) is not Number, return false.
	if (Type(number) !== 'number') {
		return false;
	}
	// 2. If number is NaN, +∞, or -∞, return false.
	if (isNaN(number) || number === Infinity || number === -Infinity) {
		return false;
	}
	// 3. Let integer be ToInteger(number).
	var integer = ToInteger(number);
	// 4. If integer is not equal to number, return false.
	if (integer !== number) {
		return false;
	}
	// 5. Otherwise, return true.
	return true;
});
