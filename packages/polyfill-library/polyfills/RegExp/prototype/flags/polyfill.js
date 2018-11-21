/* global Get, ToBoolean, Type */
Object.defineProperty(RegExp.prototype, 'flags', {
	configurable: true,
	enumerable: false,
	get: function () {
		// 21.2.5.3.1 Let R be the this value.
		var R = this;

		// 21.2.5.3.2 If Type(R) is not Object, throw a TypeError exception.
		if (Type(R) !== 'object') {
			throw new TypeError('Method called on incompatible type: must be an object.');
		}
		// 21.2.5.3.3 Let result be the empty String.
		var result = '';

		// 21.2.5.3.4 Let global be ToBoolean(? Get(R, "global")).
		var global = ToBoolean(Get(R, 'global'));

		// 21.2.5.3.5 If global is true, append the code unit 0x0067 (LATIN SMALL LETTER G) as the last code unit of result.
		if (global) {
			result += 'g';
		}

		// 21.2.5.3.6 Let ignoreCase be ToBoolean(? Get(R, "ignoreCase")).
		var ignoreCase = ToBoolean(Get(R, 'ignoreCase'));

		// 21.2.5.3.7 If ignoreCase is true, append the code unit 0x0069 (LATIN SMALL LETTER I) as the last code unit of result.
		if (ignoreCase) {
			result += 'i';
		}

		// 21.2.5.3.8 Let multiline be ToBoolean(? Get(R, "multiline")).
		var multiline = ToBoolean(Get(R, 'multiline'));

		// 21.2.5.3.9 If multiline is true, append the code unit 0x006D (LATIN SMALL LETTER M) as the last code unit of result.
		if (multiline) {
			result += 'm';
		}

		// 21.2.5.3.10 Let unicode be ToBoolean(? Get(R, "unicode")).
		var unicode = ToBoolean(Get(R, 'unicode'));

		// 21.2.5.3.11 If unicode is true, append the code unit 0x0075 (LATIN SMALL LETTER U) as the last code unit of result.
		if (unicode) {
			result += 'u';
		}

		// 21.2.5.3.12 Let sticky be ToBoolean(? Get(R, "sticky")).
		var sticky = ToBoolean(Get(R, 'sticky'));

		// 21.2.5.3.13 If sticky is true, append the code unit 0x0079 (LATIN SMALL LETTER Y) as the last code unit of result.
		if (sticky) {
			result += 'y';
		}

		// 21.2.5.3.14 Return result.
		return result;
	}
});
