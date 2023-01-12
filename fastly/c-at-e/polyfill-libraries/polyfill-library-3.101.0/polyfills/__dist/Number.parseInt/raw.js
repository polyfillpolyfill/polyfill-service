
// Number.parseInt
/* global CreateMethodProperty */
(function (nativeParseInt, global) {
    // Polyfill.io - IE 8's parseInt is incorrect
    var parseInt = function parseInt(str, radix) {
        var string = String(str).trim();
        return nativeParseInt(string, (radix >>> 0) || (/^[-+]?0[xX]/.test(string) ? 16 : 10));
    }
    try {
        CreateMethodProperty(global, 'parseInt', parseInt);
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		global.parseInt = parseInt;
	}
	// 20.1.2.13. Number.parseInt ( string, radix )
	// The value of the Number.parseInt data property is the same built-in function object that is the value of the  parseInt property of the global object defined in 18.2.5.
	CreateMethodProperty(Number, 'parseInt', global.parseInt);
}(parseInt, this));