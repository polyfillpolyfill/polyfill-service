
// Reflect.get
/* global Reflect, Call, CreateMethodProperty, Type, ToPropertyKey */
(function () {
	function _get(target, key, receiver) {
		var desc = Object.getOwnPropertyDescriptor(target, key);

		if (!desc) {
			var parent = Object.getPrototypeOf(target);

			if (parent === null) {
				return undefined;
			}

			return _get(parent, key, receiver);
		}

		if ('value' in desc) {
			return desc.value;
		}

		if (desc.get) {
			return Call(desc.get, receiver);
		}

		return undefined;
	}
	// 26.1.5 Reflect.get ( target, propertyKey [ , receiver ] )
	CreateMethodProperty(Reflect, 'get', function get(target, propertyKey /*[ , receiver ]*/ ) {
		var receiver = arguments[2];
		// 1. If Type(target) is not Object, throw a TypeError exception.
		if (Type(target) !== "object") {
			throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
		}
		// 2. Let key be ? ToPropertyKey(propertyKey).
		var key = ToPropertyKey(propertyKey);
		// 3. If receiver is not present, then
		if (!(2 in arguments)) {
			// a. Set receiver to target.
			receiver = target;
		}
		// 4. Return ? target.[[Get]](key, receiver).
		return _get(target, key, receiver);
	});
}());
