Object.create = function create(prototype, properties) {
	if (prototype !== Object(prototype)) {
		throw new TypeError('Object prototype may only be an Object or null');
	}

	var object = document.createEventObject();

	for (var property in prototype) {
		object[property] = prototype[property];
	}

	if (properties) {
		Object.defineProperties(object, properties);
	}

	return object;
};
