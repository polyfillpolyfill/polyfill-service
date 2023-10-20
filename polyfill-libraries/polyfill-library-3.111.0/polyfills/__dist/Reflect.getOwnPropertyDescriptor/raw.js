
// Reflect.getOwnPropertyDescriptor
/* global CreateMethodProperty, Reflect, Type, ToPropertyKey */
// 26.1.6 Reflect.getOwnPropertyDescriptor ( target, propertyKey )
CreateMethodProperty(Reflect, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(target, propertyKey) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Let key be ? ToPropertyKey(propertyKey).
	var key = ToPropertyKey(propertyKey);
	// Polyfill-library - these steps are handled by Object.getOwnPropertyDescriptor
	// 3. Let desc be ? target.[[GetOwnProperty]](key).
	// 4. Return FromPropertyDescriptor(desc).
	return Object.getOwnPropertyDescriptor(target, key);
});
