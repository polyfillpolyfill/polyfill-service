// Object.keys
Object.keys = function keys(object) {
	if (object !== Object(object)) {
		throw new TypeError('Object.keys called on non-object');
	}

	var buffer = [], key;

	for (key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			buffer.push(key);
		}
	}

	return buffer;
};
