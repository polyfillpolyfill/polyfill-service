
// Number.parseFloat
/* global CreateMethodProperty */
(function (nativeparseFloat, global) {
    var parseFloat = function parseFloat(str) {
        var string = String(str).trim();
        var result = nativeparseFloat(string);
        return result === 0 && string.charAt(0) == '-' ? -0 : result;
    }
	try {
        CreateMethodProperty(global, 'parseFloat', parseFloat);
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		global.parseFloat = parseFloat;
	}
	// 20.1.2.12. Number.parseFloat ( string )
	// The value of the Number.parseFloat data property is the same built-in function object that is the value of the  parseFloat property of the global object defined in 18.2.4.
	CreateMethodProperty(Number, 'parseFloat', global.parseFloat);
}(parseFloat, this));