
// _ESAbstract.IsInteger
/* globals Type */
// 7.2.6. IsInteger ( argument )
function IsInteger(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is not Number, return false.
	if (Type(argument) !== 'number') {
		return false;
	}
	// 2. If argument is NaN, +∞, or -∞, return false.
	if ( isNaN(argument) || argument === Infinity || argument === -Infinity) {
		return false;
	}
	// 3. If floor(abs(argument)) ≠ abs(argument), return false.
	if (Math.floor(Math.abs(argument)) !== Math.abs(argument)) {
		return false;
	}
	// 4. Return true.
	return true;
}
