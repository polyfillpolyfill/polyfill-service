/* global _ESAbstract */
// 7.1.16 CanonicalNumericIndexString ( argument )
_ESAbstract.CanonicalNumericIndexString = function (argument) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(argument) is String.
	// 2. If argument is "-0", return -0.
	if (argument === '-0') {
		return -0;
	}
	// 3. Let n be ! ToNumber(argument).
	var n = _ESAbstract.ToNumber(argument);
	// 4. If SameValue(! ToString(n), argument) is false, return undefined.
	if (_ESAbstract.SameValue(_ESAbstract.ToString(n), argument) === false) {
		return undefined;
	}
	// 5. Return n.
	return n;
};
