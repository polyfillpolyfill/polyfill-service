
// String.prototype.at
/* global CreateMethodProperty, RequireObjectCoercible, ToIntegerOrInfinity, ToString */
// 22.1.3.1. String.prototype.at ( index )
CreateMethodProperty(String.prototype, 'at', function at(index) {
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let len be the length of S.
	var len = S.length;
	// 4. Let relativeIndex be ? ToIntegerOrInfinity(index).
	var relativeIndex = ToIntegerOrInfinity(index);
	// 5. If relativeIndex ≥ 0, then
	// 5.a. Let k be relativeIndex.
	// 6. Else,
	// 6.a. Let k be len + relativeIndex.
	var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	// 7. If k < 0 or k ≥ len, return undefined.
	if (k < 0 || k >= len) return undefined;
	// 8. Return the substring of S from k to k + 1.
	return S.substring(k, k + 1);
});
