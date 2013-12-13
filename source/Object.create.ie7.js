// Object.create
Object.create = function create(prototype, properties) {
	if (typeof prototype !== 'object') {
		throw new Error('Object prototype may only be an Object or null');
	}

	var object = document.createEventObject();

	for (var property in prototype) {
		object[property] = prototype[property];
	}

	Object.defineProperties(object, properties);

	return object;
};
