
// Reflect.has
/* global CreateMethodProperty, Reflect, Type, ToPropertyKey, HasProperty */
// 26.1.8 Reflect.has ( target, propertyKey )
CreateMethodProperty(Reflect, 'has', function has(target, propertyKey) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Let key be ? ToPropertyKey(propertyKey).
	var key = ToPropertyKey(propertyKey);
	// 3. Return ? target.[[HasProperty]](key).
	return HasProperty(target, key);
});
