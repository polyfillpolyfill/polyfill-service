
// RegExp.prototype.@@matchAll
/* global Construct, CreateMethodProperty, CreateRegExpStringIterator, Get, SpeciesConstructor, Symbol, ToLength, ToString, Type */

var supportsRegexpLiteralConstructorWithFlags = (function () {
	try {
		new RegExp(/x/, 'g')
		return true
	} catch (ignore) {
		return false
	}
})();

// 22.2.5.8 RegExp.prototype [ @@matchAll ] ( string )
CreateMethodProperty(RegExp.prototype, Symbol.matchAll, function (string) {
	'use strict';
	// 1. Let R be the this value.
	var R = this;
	// 2. If Type(R) is not Object, throw a TypeError exception.
	if (Type(R) !== 'object') {
		throw new TypeError('Method called on incompatible type: must be an object.');
	}
	// 3. Let S be ? ToString(string).
	var S = ToString(string);
	// 4. Let C be ? SpeciesConstructor(R, %RegExp%).
	var C = SpeciesConstructor(R, RegExp);
	// 5. Let flags be ? ToString(? Get(R, "flags")).
	var flags = ToString(Get(R, 'flags'));
	// IE8 doesn't have RegExp.prototype.flags support
	if (!('flags' in RegExp.prototype)) {
		flags = '';
		if (R.global === true) {
			flags += 'g';
		}
		if (R.ignoreCase === true) {
			flags += 'i';
		}
		if (R.multiline === true) {
			flags += 'm';
		}
	}
	// 6. Let matcher be ? Construct(C, « R, flags »).
	var matcher = Construct(C, [ supportsRegexpLiteralConstructorWithFlags ? R : R.source, flags ]);
	// 7. Let lastIndex be ? ToLength(? Get(R, "lastIndex")).
	var lastIndex = ToLength(Get(R, 'lastIndex'));
	// 8. Perform ? Set(matcher, "lastIndex", lastIndex, true).
	matcher.lastIndex = lastIndex;
	// 9. If flags contains "g", let global be true.
	// 10. Else, let global be false.
	var global = flags.indexOf('g') > -1;
	// 11. If flags contains "u", let fullUnicode be true.
	// 12. Else, let fullUnicode be false.
	var fullUnicode = flags.indexOf('u') > -1;
	// 13. Return ! CreateRegExpStringIterator(matcher, S, global, fullUnicode).
	return CreateRegExpStringIterator(matcher, S, global, fullUnicode);
});
