/* global _ESAbstract */
// 7.3.10. HasProperty ( O, P )
_ESAbstract.HasProperty = function (O, P) { // eslint-disable-line no-unused-vars
	// Assert: Type(O) is Object.
	// Assert: IsPropertyKey(P) is true.
	// Return ? O.[[HasProperty]](P).
	return P in O;
};
