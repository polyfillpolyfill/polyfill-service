
// Reflect.deleteProperty
/* global Reflect, CreateMethodProperty, Type, ToPropertyKey, HasOwnProperty */
// 26.1.4 Reflect.deleteProperty ( target, propertyKey )
CreateMethodProperty(Reflect, 'deleteProperty', function deleteProperty(target, propertyKey) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. Let key be ? ToPropertyKey(propertyKey).
	var key = ToPropertyKey(propertyKey);
	// 3. Return ? target.[[Delete]](key).
	try {
		delete target[key];
		return !HasOwnProperty(target, key);
	} catch (_) {
		return false;
	}
});
