// Object.defineProperty
Object.defineProperty = function defineProperty(object, property, descriptor) {
	if (object !== Object(object)) {
		throw new TypeError('Object.defineProperty called on non-object');
	}

	if (descriptor.get) {
		object.__defineGetter__(property, descriptor.get);
	}

	if (descriptor.set) {
		object.__defineSetter__(property, descriptor.set);
	}

	return object;
};
