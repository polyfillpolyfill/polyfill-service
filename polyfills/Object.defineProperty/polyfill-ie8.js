(function (nativeDefineProperty) {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		// handle object
		if (object === null || typeof object !== 'object') {
			throw new TypeError('Object must be an object');
		}

		// handle descriptor
		if (descriptor === null || typeof descriptor !== 'object') {
			throw new TypeError('Descriptor must be an object');
		}

		var
		propertyString = String(property),
		constructor = object.constructor;

		// handle native support
		if (constructor === Window || constructor === HTMLDocument || constructor === Element) {
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
