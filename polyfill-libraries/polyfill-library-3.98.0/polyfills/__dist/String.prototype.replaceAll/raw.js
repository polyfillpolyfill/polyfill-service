
// String.prototype.replaceAll
/* global CreateMethodProperty, RequireObjectCoercible, ToString, IsRegExp, Get, GetMethod, Call, IsCallable, StringIndexOf, GetSubstitution */

// 21.1.3.18 String.prototype.replaceAll ( searchValue, replaceValue )
CreateMethodProperty(String.prototype, 'replaceAll', function replaceAll(searchValue, replaceValue ) {
	'use strict';
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. If searchValue is neither undefined nor null, then
	if (searchValue !== undefined && searchValue !== null) {
		// 2.a. Let isRegExp be ? IsRegExp(searchValue).
		var isRegExp = IsRegExp(searchValue);
		// 2.b. If isRegExp is true, then
		if (isRegExp) {
			// 2.b.i. Let flags be ? Get(searchValue, "flags").
			var flags = Get(searchValue, "flags");
			// 2.b.ii. Perform ? RequireObjectCoercible(flags).
			RequireObjectCoercible(flags)
			// 2.b.iii. If ? ToString(flags) does not contain "g", throw a TypeError exception.
			if (ToString(flags).includes('g')) {
				throw TypeError('');
			}
		}
		// 2.c. Let replacer be ? GetMethod(searchValue, @@replace).
		var replacer = 'Symbol' in self && 'replace' in self.Symbol ? GetMethod(searchValue, self.Symbol.replace) : undefined;
		// 2.d. If replacer is not undefined, then
		if (replacer !== undefined) {
			// 2.d.i. Return ? Call(replacer, searchValue, « O, replaceValue »).
			return Call(replacer, searchValue, [ O, replaceValue ]);
		}
	}
	// 3. Let string be ? ToString(O).
	var string = ToString(O);
	// 4. Let searchString be ? ToString(searchValue).
	var searchString = ToString(searchValue);
	// 5. Let functionalReplace be IsCallable(replaceValue).
	var functionalReplace = IsCallable(replaceValue);
	// 6. If functionalReplace is false, then
	if (functionalReplace === false) {
		// 6.a. Set replaceValue to ? ToString(replaceValue).
		replaceValue = ToString(replaceValue);
	}
	// 7. Let searchLength be the length of searchString.
	var searchLength = searchString.length;
	// 8. Let advanceBy be max(1, searchLength).
	var advanceBy = Math.max(1, searchLength);
	// 9. Let matchPositions be a new empty List.
	var matchPositions = [];
	// 10. Let position be ! StringIndexOf(string, searchString, 0).
	var position = StringIndexOf(string, searchString, 0);
	// 11. Repeat, while position is not -1,
	while (position !== -1) {
		// 11.a. Append position to the end of matchPositions.
		matchPositions.push(position);
		// 11.b. Set position to ! StringIndexOf(string, searchString, position + advanceBy).
		position = StringIndexOf(string, searchString, position + advanceBy);
	}
	// 12. Let endOfLastMatch be 0.
	var endOfLastMatch = 0;
	// 13. Let result be the empty String.
	var result = '';
	// 14. For each element position of matchPositions, do
	for (var i = 0; i < matchPositions.length; i++) {
		// 14.a. Let preserved be the substring of string from endOfLastMatch to position.
		var preserved = string.substring(endOfLastMatch, position);
		// 14.b. If functionalReplace is true, then
		if (functionalReplace) {
			// 14.b.i. Let replacement be ? ToString(? Call(replaceValue, undefined, « searchString, position, string »)).
			var replacement = ToString(Call(replaceValue, undefined, [searchString, position, string]));
			// 14.c. Else,
		} else {
			// 14.c.i. Assert: Type(replaceValue) is String.
			// 14.c.ii. Let captures be a new empty List.
			var captures = [];
			// 14.c.iii. Let replacement be ! GetSubstitution(searchString, string, position, captures, undefined, replaceValue).
			replacement = GetSubstitution(searchString, string, position, captures, undefined, replaceValue);
		}
		// 14.d. Set result to the string-concatenation of result, preserved, and replacement.
		result = result + preserved + replacement;
		// 14.e. Set endOfLastMatch to position + searchLength.
		endOfLastMatch = position + searchLength;
	}
	// 15. If endOfLastMatch < the length of string, then
	if (endOfLastMatch < string.length) {
		// 15.a. Set result to the string-concatenation of result and the substring of string from endOfLastMatch.
		result = result + string.substring(endOfLastMatch);
	}
	// 16. Return result.
	return result;
});
