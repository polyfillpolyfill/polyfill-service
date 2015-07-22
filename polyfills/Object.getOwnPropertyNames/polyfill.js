Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
	if (object !== Object(object)) {
		throw new TypeError('Object.getOwnPropertyNames called on non-object');
	}

	var buffer = [], key;

	for (key in object) {
		if (object.hasOwnProperty(key)) {
			buffer.push(key);
		}
	}

	return buffer;
};
