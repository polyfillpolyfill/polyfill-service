
// _ESAbstract.AdvanceStringIndex
/* global */

// 22.2.5.2.3 AdvanceStringIndex ( S, index, unicode )
function AdvanceStringIndex(S, index, unicode) { // eslint-disable-line no-unused-vars
	// 1. Assert: index ≤ 253 - 1.
	if (index > Number.MAX_SAFE_INTEGER) {
		throw new TypeError('Assertion failed: `index` must be <= 2**53');
	}
	// 2. If unicode is false, return index + 1.
	if (unicode === false) {
		return index + 1;
	}
	// 3. Let length be the number of code units in S.
	var length = S.length;
	// 4. If index + 1 ≥ length, return index + 1.
	if (index + 1 >= length) {
		return index + 1;
	}
	// 5. Let cp be ! CodePointAt(S, index).
	var cp = S.codePointAt(index);
	// 6. Return index + cp.[[CodeUnitCount]].
	return index + cp.length;
}
