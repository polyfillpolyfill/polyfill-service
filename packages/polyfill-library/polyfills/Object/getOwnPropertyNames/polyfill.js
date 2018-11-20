/* global CreateMethodProperty */

var toString = ({}).toString;
var split = ''.split;

CreateMethodProperty(Object, 'getOwnPropertyNames', function getOwnPropertyNames(object) {
	var buffer = [];
	var key;

	// Non-enumerable properties cannot be discovered but can be checked for by name.
	// Define those used internally by JS to allow an incomplete solution
	var commonProps = ['length', "name", "arguments", "caller", "prototype", "observe", "unobserve"];

	if (typeof object === 'undefined' || object === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	// Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
	object = toString.call(object) == '[object String]' ? split.call(object, '') : Object(object);

	// Enumerable properties only
	for (key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			buffer.push(key);
		}
	}

	// Check for and add the common non-enumerable properties
	for (var i=0, s=commonProps.length; i<s; i++) {
		if (commonProps[i] in object) buffer.push(commonProps[i]);
	}

	return buffer;
});
