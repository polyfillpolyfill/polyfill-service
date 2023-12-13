
// _ESAbstract.CanonicalNumericIndexString
/* global ToNumber, SameValue, ToString */
// 7.1.16 CanonicalNumericIndexString ( argument )
function CanonicalNumericIndexString(argument) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(argument) is String.
	// 2. If argument is "-0", return -0.
	if (argument === '-0') {
		return -0;
	}
	// 3. Let n be ! ToNumber(argument).
	var n = ToNumber(argument);
	// 4. If SameValue(! ToString(n), argument) is false, return undefined.
	if (SameValue(ToString(n), argument) === false) {
		return undefined;
	}
	// 5. Return n.
	return n;
}
