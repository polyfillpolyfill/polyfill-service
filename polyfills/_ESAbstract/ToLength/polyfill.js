/* global _ESAbstract */
// 7.1.15. ToLength ( argument )
_ESAbstract.ToLength = function (argument) { // eslint-disable-line no-unused-vars
	// 1. Let len be ? ToInteger(argument).
	var len = _ESAbstract.ToInteger(argument);
	// 2. If len ≤ +0, return +0.
	if (len <= 0) {
		return 0;
	}
	// 3. Return min(len, 253-1).
	return Math.min(len, Math.pow(2, 53) - 1);
};
