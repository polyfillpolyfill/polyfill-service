/* global CreateMethodProperty, Get, HasProperty, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.12. Array.prototype.indexOf ( searchElement [ , fromIndex ] )
CreateMethodProperty(Array.prototype, 'indexOf', function indexOf(searchElement /* [ , fromIndex ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If len is 0, return -1.
	if (len === 0) {
		return -1;
	}
	// 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
	var n = ToInteger(arguments[1]);
	// 5. If n ≥ len, return -1.
	if (n >= len) {
		return -1;
	}
	// 6. If n ≥ 0, then
	if (n >= 0) {
		// a. If n is -0, let k be +0; else let k be n.
		var k = n === -0 ? 0 : n;
		// 7. Else n < 0,
	} else {
		// a. Let k be len + n.
		var k = len + n;
		// b. If k < 0, let k be 0.
		if (k < 0) {
			k = 0;
		}
	}
	// 8. Repeat, while k < len
	while (k < len) {
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
		// c. Increase k by 1.
		k = k + 1;
	}
	// 9. Return -1.
	return -1;
});
