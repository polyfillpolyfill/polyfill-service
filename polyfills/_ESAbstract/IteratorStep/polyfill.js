/* global _ESAbstract */
// 7.4.5. IteratorStep ( iteratorRecord )
_ESAbstract.IteratorStep = function (iteratorRecord) { // eslint-disable-line no-unused-vars
	// 1. Let result be ? IteratorNext(iteratorRecord).
	var result = _ESAbstract.IteratorNext(iteratorRecord);
	// 2. Let done be ? IteratorComplete(result).
	var done = _ESAbstract.IteratorComplete(result);
	// 3. If done is true, return false.
	if (done === true) {
		return false;
	}
	// 4. Return result.
	return result;
};
