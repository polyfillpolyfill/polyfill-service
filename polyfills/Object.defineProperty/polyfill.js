(function () {
	if (Object.defineProperty) {
		return;
	}

	var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
	var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
	var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

	Object.defineProperty = function defineProperty(object, property, descriptor) {
		// handle object
		if (object === null || !(object instanceof Object || typeof object === 'object')) {
			throw new TypeError('Object must be an object');
		}

		// handle descriptor
		if (!(descriptor instanceof Object)) {
			throw new TypeError('Descriptor must be an object');
		}

		var
		propertyString = String(property),
		getterType = 'get' in descriptor && typeof descriptor.get,
		setterType = 'set' in descriptor && typeof descriptor.set,
		hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

		// handle descriptor.get
		if (getterType) {
			if (getterType !== 'function') {
				throw new TypeError('Getter expected a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			object.__defineGetter__(propertyString, descriptor.get);
		} else {
			object[propertyString] = descriptor.value;
		}

		// handle descriptor.set
		if (setterType) {
			if (setterType !== 'function') {
				throw new TypeError('Setter expected a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			object.__defineSetter__(propertyString, descriptor.set);
		}

		// return object
		return object;
	};
}());
