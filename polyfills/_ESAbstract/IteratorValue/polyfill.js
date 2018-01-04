/* global _ESAbstract */
// 7.4.4 IteratorValue ( iterResult )
_ESAbstract.IteratorValue = function (iterResult) { // eslint-disable-line no-unused-vars
	// Assert: Type(iterResult) is Object.
	if (_ESAbstract.Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	// Return ? Get(iterResult, "value").
	return _ESAbstract.Get(iterResult, "value");
};
