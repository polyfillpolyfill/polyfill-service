
// String.prototype.matchAll
/* global Call, CreateMethodProperty, Get, GetMethod, Invoke, IsRegExp, RequireObjectCoercible, ToString */

// 22.1.3.13 String.prototype.matchAll ( regexp )
CreateMethodProperty(String.prototype, 'matchAll', function matchAll(regexp) {
	'use strict';
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. If regexp is neither undefined nor null, then
	if (regexp !== undefined && regexp !== null) {
		// 2.a. Let isRegExp be ? IsRegExp(regexp).
		var isRegExp = IsRegExp(regexp);
		// 2.b. If isRegExp is true, then
		if (isRegExp) {
			// 2.b.i. Let flags be ? Get(regexp, "flags").
			var flags = Get(regexp, "flags");

			// IE8 doesn't have RegExp.prototype.flags support, it does have RegExp.prototype.global
			// 2.b.iii. If ? ToString(flags) does not contain "g", throw a TypeError exception.
			if (!('flags' in RegExp.prototype) && regexp.global !== true) {
				throw TypeError('');
			} else if ('flags' in RegExp.prototype) {
				// 2.b.ii. Perform ? RequireObjectCoercible(flags).
				RequireObjectCoercible(flags)
				// 2.b.iii. If ? ToString(flags) does not contain "g", throw a TypeError exception.
				if (ToString(flags).indexOf('g') === -1) {
					throw TypeError('');
				}
			}
		}
		// 2.c. Let matcher be ? GetMethod(regexp, @@matchAll).
		var matcher = 'Symbol' in self && 'matchAll' in self.Symbol ? GetMethod(regexp, self.Symbol.matchAll) : undefined;
		// 2.d. If matcher is not undefined, then
		if (matcher !== undefined) {
			// 2.d.i. Return ? Call(matcher, regexp, « O »).
			return Call(matcher, regexp, [ O ]);
		}
	}
	// 3. Let S be ? ToString(O).
	var S = ToString(O);
	// 4. Let rx be ? RegExpCreate(regexp, "g").
	var rx = new RegExp(regexp, 'g');
	// 5. Return ? Invoke(rx, @@matchAll, « S »).
	return Invoke(rx, 'Symbol' in self && 'matchAll' in self.Symbol && self.Symbol.matchAll, [ S ]);
});
