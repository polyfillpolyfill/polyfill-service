/* global _ESAbstract */
// 7.3.1. Get ( O, P )
_ESAbstract.Get = function (O, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(O) is Object.
	// 2. Assert: IsPropertyKey(P) is true.
	// 3. Return ? O.[[Get]](P, O).
	return O[P];
};
