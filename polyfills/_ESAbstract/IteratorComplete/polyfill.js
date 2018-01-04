/* global _ESAbstract */
// 7.4.3 IteratorComplete ( iterResult )
_ESAbstract.IteratorComplete = function (iterResult) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(iterResult) is Object.
	if (_ESAbstract.Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// 2. Return ToBoolean(? Get(iterResult, "done")).
	return _ESAbstract.ToBoolean(_ESAbstract.Get(iterResult, "done"));
};
