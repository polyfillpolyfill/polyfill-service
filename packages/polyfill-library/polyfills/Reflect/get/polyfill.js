(function (Object) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	function anObject(it) {
		if (!isObject(it)) {
			throw TypeError(it + ' is not an object!');
		}
		return it;
	}

	Object.defineProperty(Reflect, 'get', {
		value: function get(target, propertyKey) {
			var receiver, desc, proto;

			receiver = arguments.length < 3 ? target : arguments[2];

			if (anObject(target) === receiver) {
				return target[propertyKey];
			}

			desc = Object.getOwnPropertyDescriptor(target, propertyKey);

			if (Object.hasOwnProperty.call(desc, 'value')) {
				return desc.value;
			}
			if (desc.get !== undefined) {
				return desc.get.call(receiver);
			}

			proto = Object.getPrototypeOf(target);

			if (isObject(proto)) {
				return get(proto, propertyKey, receiver);
			}
		},
		configurable: true,
		writable: true
	});
})(Object);
