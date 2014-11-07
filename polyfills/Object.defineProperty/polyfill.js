Object.defineProperty = Object.defineProperty || function defineProperty(object, property, descriptor) {
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
	setterType = 'set' in descriptor && typeof descriptor.set;

	// handle descriptor.get
	if (getterType && getterType !== 'function') {
		throw new TypeError('Getter expected a function');
	}

	// handle descriptor.set
	if (setterType && setterType !== 'function') {
		throw new TypeError('Setter expected a function');
	}

	// handle descriptor.get
	if (getterType) {
		object.__defineGetter__(propertyString, descriptor.get);
	}
	// handle descriptor.value
	else {
		object[propertyString] = descriptor.value;
	}

	// handle descriptor.set
	if (setterType) {
		object.__defineSetter__(propertyString, descriptor.set);
	}

	// return object
	return object;
};
