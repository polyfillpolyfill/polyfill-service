
// _ESAbstract.IsPropertyKey
/* globals Type */
// 7.2.7 IsPropertyKey ( argument )
function IsPropertyKey(argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is String, return true.
	if (Type(argument) === 'string') {
		return true;
	}
	// 2. If Type(argument) is Symbol, return true.
	if (Type(argument) === 'symbol') {
		return true;
	}
	// 3. Return false.
	return false;
}
