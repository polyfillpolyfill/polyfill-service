(function (nativeDefineProperty) {
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
		hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

		// handle native support
		if (object === window || object === document || object === Element.prototype || object instanceof Element) {
			return nativeDefineProperty(object, propertyString, descriptor);
		}

		if ('get' in descriptor) {
			if (typeof descriptor.get !== 'function') {
				throw new TypeError('Getter expected a function');
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
		}

		if ('set' in descriptor) {
			if (typeof descriptor.set !== 'function') {
				throw new TypeError('Setter expected a function');
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
		}

		// OK to define value unconditionally, since all supported getter/accessor use cases are handled natively
		object[propertyString] = descriptor.value;

		// return object
		return object;
	};
})(Object.defineProperty);
