(function (nativeparseFloat, global) {
	var whitespace = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	// Polyfill.io - IE 8's parseFloat is incorrect
	if (1 / nativeparseFloat(whitespace + '-0') !== -Infinity) {
		CreateMethodProperty(global, 'parseFloat', function parseFloat(str) {
			var string = String(str).trim();
			var result = nativeparseFloat(string);
			return result === 0 && string.charAt(0) == '-' ? -0 : result;
		});
	}
	// 20.1.2.12. Number.parseFloat ( string )
	// The value of the Number.parseFloat data property is the same built-in function object that is the value of the  parseFloat property of the global object defined in 18.2.4.
	CreateMethodProperty(Number, 'parseFloat', parseFloat);
}(parseFloat, this));
