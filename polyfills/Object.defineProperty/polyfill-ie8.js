(function (nativeDefineProperty) {
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
		propertyString = String(property);

		// handle native support
		if (object === window || object === document || object === Element.prototype || object instanceof Element) {
			return nativeDefineProperty(object, propertyString, descriptor);
		}

		// handle descriptor.get
		if ('get' in descriptor) {
			object[propertyString] = descriptor.get.call(object);
		}
		// handle descriptor.value
		else {
			object[propertyString] = descriptor.value;
		}

		// return object
		return object;
	};
})(Object.defineProperty);
