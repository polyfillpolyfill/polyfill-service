
// Reflect.set
/* global CreateMethodProperty, Reflect, Type, ToPropertyKey, Call */
(function () {
	function _set(propertyKey, value, receiver, target) {
		var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
		try {
			if (desc && desc.set) {
				return Call(desc.set, receiver, [value]);
			} else {
				target[propertyKey] = value;
			}
			return true;
		} catch (e) {
			return false;
		}
	}
	// 26.1.12 Reflect.set ( target, propertyKey, V [ , receiver ] )
	CreateMethodProperty(Reflect, 'set', function set(target, propertyKey, V /*[ , receiver ]*/ ) {
		var receiver = arguments[3];
		// 1. If Type(target) is not Object, throw a TypeError exception.
		if (Type(target) !== "object") {
			throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
		}
		// 2. Let key be ? ToPropertyKey(propertyKey).
		var key = ToPropertyKey(propertyKey);
		// 3. If receiver is not present, then
		if (!(3 in arguments)) {
			// a. Set receiver to target.
			receiver = target;
		}
		// 4. Return ? target.[[Set]](key, V, receiver).
		return _set(key, V, receiver, target);
	});
}());
