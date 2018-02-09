(function (nativeParseInt, global) {
	var whitespace = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	// Polyfill.io - IE 8's parseInt is incorrect
	if (parseInt(whitespace + '08') !== 8 || parseInt(whitespace + '0x16') !== 22) {
		CreateMethodProperty(global, 'parseInt', function parseInt(str, radix) {
			var string = String(str).trim();
			return nativeParseInt(string, (radix >>> 0) || (/^[-+]?0[xX]/.test(string) ? 16 : 10));
		});
	}
	// 20.1.2.13. Number.parseInt ( string, radix )
	// The value of the Number.parseInt data property is the same built-in function object that is the value of the  parseInt property of the global object defined in 18.2.5.
	CreateMethodProperty(Number, 'parseInt', parseInt);
}(parseInt, this));
