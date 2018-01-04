/* global _ESAbstract */
// 7.2.7 IsPropertyKey ( argument )
_ESAbstract.IsPropertyKey = function (argument) { // eslint-disable-line no-unused-vars
	// 1. If Type(argument) is String, return true.
	if (_ESAbstract.Type(argument) === 'string') {
		return true;
	}
	// 2. If Type(argument) is Symbol, return true.
	if (_ESAbstract.Type(argument) === 'symbol') {
		return true;
	}
	// 3. Return false.
	return false;
};
