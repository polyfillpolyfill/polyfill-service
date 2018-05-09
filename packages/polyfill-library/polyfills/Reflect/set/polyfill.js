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

	function createDescriptor(value) {
		return {
			configurable: true,
			enumerable: true,
			writable: true,
			value: value
		};
	}

	Object.defineProperty(Reflect, 'set', {
		value: function set(target, propertyKey, V) {
			var receiver, proto, ownDesc, existingDescriptor;

			ownDesc = Object.getOwnPropertyDescriptor(anObject(target), propertyKey);
			receiver = arguments.length < 4 ? target : arguments[3];

			if (!ownDesc) {
				proto = Object.getPrototypeOf(target);

				if (isObject(proto)) {
					return set(proto, propertyKey, receiver);
				}

				ownDesc = createDescriptor();
			}

			if (Object.hasOwnProperty.call(ownDesc, 'value')) {
				if (!ownDesc.writable || !isObject(receiver)) {
					return false;
				}

				existingDescriptor = Object.getOwnPropertyDescriptor(receiver, propertyKey);
				if (existingDescriptor) {
					if (existingDescriptor.get || existingDescriptor.set || !existingDescriptor.writable) {
						return false;
					}

					existingDescriptor.value = V;
					Object.defineProperty(receiver, propertyKey, existingDescriptor);
				} else {
					Object.defineProperty(receiver, propertyKey, createDescriptor(V));
				}

				return true;
			}

			return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
		},
		configurable: true,
		writable: true
	});
})(Object);
