
// Reflect.defineProperty
/* global CreateMethodProperty, Reflect, Type, ToPropertyKey, ToPropertyDescriptor */
// 26.1.3 Reflect.defineProperty ( target, propertyKey, attributes )
CreateMethodProperty(Reflect, 'defineProperty', function defineProperty(target, propertyKey, attributes ) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Let key be ? ToPropertyKey(propertyKey).
	var key = ToPropertyKey(propertyKey);
	// 3. Let desc be ? ToPropertyDescriptor(attributes).
	var desc = ToPropertyDescriptor(attributes);
	// 4. Return ? target.[[DefineOwnProperty]](key, desc).
	try {
		Object.defineProperty(target, key, desc);
		return true;
	} catch (e) {
		return false;
	}
});
