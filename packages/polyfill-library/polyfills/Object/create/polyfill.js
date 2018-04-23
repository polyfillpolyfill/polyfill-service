/* global CreateMethodProperty, Type */
CreateMethodProperty(Object, 'create', function create(O, properties) {
	// 1. If Type(O) is neither Object nor Null, throw a TypeError exception.
	if (Type(O) !== 'object' && Type(O) !== 'null') {
		throw new TypeError('Object prototype may only be an Object or null');
	}
	// 2. Let obj be ObjectCreate(O).
	var obj = new Function('e', 'function Object() {}Object.prototype=e;return new Object')(O);

	obj.constructor.prototype = O;

	// 3. If Properties is not undefined, then
	if (1 in arguments) {
		// a. Return ? ObjectDefineProperties(obj, Properties).
		return Object.defineProperties(obj, properties);
	}

	return obj;
});
