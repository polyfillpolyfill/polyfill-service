/* global _ESAbstract */
// 7.3.9. GetMethod ( V, P )
_ESAbstract.GetMethod = function (V, P) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. Let func be ? GetV(V, P).
	var func = _ESAbstract.GetV(V, P);
	// 3. If func is either undefined or null, return undefined.
	if (func === null || func === undefined) {
		return undefined;
	}
	// 4. If IsCallable(func) is false, throw a TypeError exception.
	if (_ESAbstract.IsCallable(func) === false) {
		throw new TypeError('Method not callable: ' + P);
	}
	// 5. Return func.
	return func;
};
