
// _ESAbstract.GetSubstitution
/* global Type */
// 21.1.3.17.1 GetSubstitution ( matched, str, position, captures, namedCaptures, replacement )
var GetSubstitution = (function() { // eslint-disable-line no-unused-vars
	function isDigit(string) {
		return /^[0-9]$/.test(string);
	}
	return function GetSubstitution ( matched, str, position, captures, namedCaptures, replacement ) { // eslint-disable-line no-unused-vars
		// 1. Assert: Type(matched) is String.
		// 2. Let matchLength be the number of code units in matched.
		var matchLength = matched.length;
		// 3. Assert: Type(str) is String.
		// 4. Let stringLength be the number of code units in str.
		var stringLength = str.length;
		// 5. Assert: ! IsNonNegativeInteger(position) is true.
		// 6. Assert: position ≤ stringLength.
		// 7. Assert: captures is a possibly empty List of Strings.
		// 8. Assert: Type(replacement) is String.
		// 9. Let tailPos be position + matchLength.
		var tailPos = position + matchLength;
		// 10. Let m be the number of elements in captures.
		var m = captures.length;
		// 11. Let result be the String value derived from replacement by copying
		// code unit elements from replacement to result while performing replacements
		// as specified in Table 53. These $ replacements are done left-to-right, and,
		// once such a replacement is performed, the new replacement text is not subject to further replacements.
		var result = '';
		for (var i = 0; i < replacement.length; i += 1) {
			// if this is a $, and it's not the end of the replacement
			var current = replacement.charAt(i);
			var isLast = (i + 1) >= replacement.length;
			var nextIsLast = (i + 2) >= replacement.length;
			if (current === '$' && !isLast) {
				var next = replacement.charAt(i + 1);
				if (next === '$') {
					result += '$';
					i += 1;
				} else if (next === '&') {
					result += matched;
					i += 1;
				} else if (next === '`') {
					result += position === 0 ? '' : str.slice(0, position - 1);
					i += 1;
				} else if (next === "'") {
					result += tailPos >= stringLength ? '' : str.slice(tailPos);
					i += 1;
				} else {
					var nextNext = nextIsLast ? null : replacement.charAt(i + 2);
					if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
						// $1 through $9, and not followed by a digit
						var n = parseInt(next, 10);
						// if (n > m, impl-defined)
						result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
						i += 1;
					} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
						// $00 through $99
						var nn = next + nextNext;
						var nnI = parseInt(nn, 10) - 1;
						// if nn === '00' or nn > m, impl-defined
						result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
						i += 2;
					} else {
						result += '$';
					}
				}
			} else {
				// the final $, or else not a $
				result += replacement.charAt(i);
			}
		}
		// 12. Return result.
		return result;
	};
}());
