
// Object.defineProperties
Object.defineProperties = function defineProperties(object, descriptors) {
	for (var property in descriptors) {
		if (descriptors.hasOwnProperty(property)) {
			Object.defineProperty(object, property, descriptors[property]);
		}
	}

	return object;
};
