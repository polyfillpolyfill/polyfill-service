/* global CreateMethodProperty, Get, HasProperty, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.15. Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
CreateMethodProperty(Array.prototype, 'lastIndexOf', function lastIndexOf(searchElement /* [ , fromIndex ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If len is 0, return -1.
	if (len === 0) {
		return -1;
	}
	// 4. If fromIndex is present, let n be ? ToInteger(fromIndex); else let n be len-1.
	var n = arguments.length > 1 ? ToInteger(arguments[1]) : len - 1;
	// 5. If n ≥ 0, then
	if (n >= 0) {
		// a. If n is -0, let k be +0; else let k be min(n, len - 1).
		var k = n === -0 ? 0 : Math.min(n, len - 1);
		// 6. Else n < 0,
	} else {
		// a. Let k be len + n.
		k = len + n;
	}
	// 7. Repeat, while k ≥ 0
	while (k >= 0) {
		// a. Let kPresent be ? HasProperty(O, ! ToString(k)).
		var kPresent = HasProperty(O, ToString(k));
		// b. If kPresent is true, then
		if (kPresent) {
			// i. Let elementK be ? Get(O, ! ToString(k)).
			var elementK = Get(O, ToString(k));
			// ii. Let same be the result of performing Strict Equality Comparison searchElement === elementK.
			var same = searchElement === elementK;
			// iii. If same is true, return k.
			if (same) {
				return k;
			}
		}
		// c. Decrease k by 1.
		k = k - 1;
	}
	// 9. Return -1.
	return -1;
});
