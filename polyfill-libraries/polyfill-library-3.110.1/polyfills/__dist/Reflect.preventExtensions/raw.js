
// Reflect.preventExtensions
/* global CreateMethodProperty, Reflect, Type */
// 26.1.11 Reflect.preventExtensions ( target )
CreateMethodProperty(Reflect, 'preventExtensions', function preventExtensions(target) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}

	// 2. Return ? target.[[PreventExtensions]]().
	try {
		Object.preventExtensions(target);
		return true;
	} catch (_) {
		return false;
	}
});
