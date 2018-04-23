/* global CreateMethodProperty, RequireObjectCoercible, ToInteger, ToString, UTF16Decode */
// 21.1.3.3. String.prototype.codePointAt ( pos )
CreateMethodProperty(String.prototype, 'codePointAt', function codePointAt(pos) {
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let position be ? ToInteger(pos).
	var position = ToInteger(pos);
	// 4. Let size be the length of S.
	var size = S.length;
	// 5. If position < 0 or position ≥ size, return undefined.
	if (position < 0 || position >= size) {
		return undefined;
	}
	// 6. Let first be the numeric value of the code unit at index position within the String S.
	var first = String.prototype.charCodeAt.call(S, position);
	// 7. If first < 0xD800 or first > 0xDBFF or position+1 = size, return first.
	if (first < 0xD800 || first > 0xDBFF || position + 1 === size) {
		return first;
	}
	// 8. Let second be the numeric value of the code unit at index position+1 within the String S.
	var second = String.prototype.charCodeAt.call(S, position + 1);
	// 9. If second < 0xDC00 or second > 0xDFFF, return first.
	if (second < 0xDC00 || second > 0xDFFF) {
		return first;
	}
	// 10. Return UTF16Decode(first, second).
	// 21.1.3.3.10 Return UTF16Decode(first, second).
	return UTF16Decode(first, second);
});
