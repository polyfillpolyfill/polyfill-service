
// Reflect.getPrototypeOf
/* global CreateMethodProperty, Reflect, Type */
// 26.1.7 Reflect.getPrototypeOf ( target )
CreateMethodProperty(Reflect, 'getPrototypeOf', function getPrototypeOf(target) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Return ? target.[[GetPrototypeOf]]().
	return Object.getPrototypeOf(target);
});
