Object.defineProperties = function defineProperties(object, descriptors) {
	for (var property in descriptors) {
		if (Object.hasOwnProperty(property)) {
			Object.defineProperty(object, property, descriptors[property]);
		}
	}

	return object;
};
