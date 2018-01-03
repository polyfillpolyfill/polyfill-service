// 22.1.3.5. Array.prototype.every ( callbackfn [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'every', function every(callbackfn /* [ , thisArg ] */) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? ToLength(? Get(O, "length")).
	var len = ToLength(Get(O, "length"));
	// 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
	if (IsCallable(callbackfn) === false) {
		throw new TypeError(callbackfn + ' is not a function');
	}
	// 4. If thisArg is present, let T be thisArg; else let T be undefined.
	var T = arguments.length > 1 ? arguments[1] : undefined;
	// 5. Let k be 0.
	var k = 0;
	// 6. Repeat, while k < len
	while (k < len) {
		// a. Let Pk be ! ToString(k).
		var Pk = ToString(k);
		// b. Let kPresent be ? HasProperty(O, Pk).
		var kPresent = HasProperty(O, Pk);
		// c. If kPresent is true, then
		if (kPresent) {
			// i. Let kValue be ? Get(O, Pk).
			var kValue = Get(O, Pk);
			// ii. Let testResult be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
			var testResult = ToBoolean(Call(callbackfn, T, [kValue, k, O]));
			// iii. If testResult is false, return false.
			if (testResult === false) {
				return false;
			}
		}
		// d. Increase k by 1.
		var k = k + 1;
	}
	// 7. Return true.
	return true;
});
