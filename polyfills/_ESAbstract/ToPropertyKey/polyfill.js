/* global _ESAbstract */
// 7.1.14. ToPropertyKey ( argument )
_ESAbstract.ToPropertyKey = function (argument) { // eslint-disable-line no-unused-vars
	// 1. Let key be ? ToPrimitive(argument, hint String).
	var key = _ESAbstract.ToPrimitive(argument, String);
	// 2. If Type(key) is Symbol, then
	if (_ESAbstract.Type(key) === 'symbol') {
		// a. Return key.
		return key;
	}
	// 3. Return ! ToString(key).
	return _ESAbstract.ToString(key);
};
