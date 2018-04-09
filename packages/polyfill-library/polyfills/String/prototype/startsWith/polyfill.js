// 21.1.3.20. String.prototype.startsWith ( searchString [ , position ] )
CreateMethodProperty(String.prototype, 'startsWith', function startsWith(searchString /* [ , position ] */) {
	'use strict';
	var position = arguments.length > 1 ? arguments[1] : undefined;
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let isRegExp be ? IsRegExp(searchString).
	var isRegExp = IsRegExp(searchString);
	// 4. If isRegExp is true, throw a TypeError exception.
	if (isRegExp) {
		throw new TypeError('First argument to String.prototype.startsWith must not be a regular expression');
	}
	// 5. Let searchStr be ? ToString(searchString).
	var searchStr = ToString(searchString);
	// 6. Let pos be ? ToInteger(position). (If position is undefined, this step produces the value 0.)
	var pos = ToInteger(position);
	// 7. Let len be the length of S.
	var len = S.length;
	// 8. Let start be min(max(pos, 0), len).
	var start = Math.min(Math.max(pos, 0), len);
	// 9. Let searchLength be the length of searchStr.
	var searchLength = searchStr.length;
	// 10. If searchLength+start is greater than len, return false.
	if (searchLength + start > len) {
		return false;
	}
	// 11. If the sequence of elements of S starting at start of length searchLength is the same as the full element sequence of searchStr, return true.
	if (S.substr(start).indexOf(searchString) === 0) {
		return true;
	}
	// 12. Otherwise, return false.
	return false;
});
