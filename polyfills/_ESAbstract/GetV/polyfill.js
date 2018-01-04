/* global _ESAbstract */
// 7.3.2 GetV (V, P)
_ESAbstract.GetV = function (v, p) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let O be ? ToObject(V).
	var o = _ESAbstract.ToObject(v);
	// 3. Return ? O.[[Get]](P, V).
	return o[p];
};
