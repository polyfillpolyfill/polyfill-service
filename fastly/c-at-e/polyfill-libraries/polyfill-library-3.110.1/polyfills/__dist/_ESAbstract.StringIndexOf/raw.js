
// _ESAbstract.StringIndexOf
/* global */
function StringIndexOf(string, searchValue, fromIndex) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(string) is String.
	// 2. Assert: Type(searchValue) is String.
	// 3. Assert: ! IsNonNegativeInteger(fromIndex) is true.
	// 4. Let len be the length of string.
	var len = string.length;
	// 5. If searchValue is the empty String and fromIndex ≤ len, return fromIndex.
	if (searchValue === "" && fromIndex <= len) {
		return fromIndex;
	}
	// 6. Let searchLen be the length of searchValue.
	var searchLen = searchValue.length;
	// 7. If there exists any integer k such that fromIndex ≤ k ≤ len - searchLen
	// and for all nonnegative integers j less than searchLen, the code unit at
	// index k + j within string is the same as the code unit at index j within searchValue,
	// let pos be the smallest (closest to -∞) such integer. Otherwise, let pos be -1.
	var k = fromIndex;
	var pos = -1;
	while (k + searchLen <= len) {
		var match = true;
		for (var j = 0; j < searchLen; j += 1) {
			if (string[k + j] !== searchValue[j]) {
				match = false;
				break;
			}
		}
		if (match) {
			pos = k;
			break;
		}
		k += 1;
	}
	// 8. Return pos.
	return pos;
}
