// Object.defineProperty
Object.defineProperty = function (object, property, descriptor) {
	if (descriptor.get) {
		object.__defineGetter__(property, descriptor.get);
	}

	if (descriptor.set) {
		object.__defineSetter__(property, descriptor.set);
	}

	return object;
};
