
// Reflect.isExtensible
/* global CreateMethodProperty, Reflect, Type */
// 26.1.9 Reflect.isExtensible ( target )
CreateMethodProperty(Reflect, 'isExtensible', function isExtensible(target) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Return ? target.[[IsExtensible]]().
	return Object.isExtensible(target);
});
