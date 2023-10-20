
// Array.prototype.reduce
Array.prototype.reduce = function reduce(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + ' is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	arraylike = object instanceof String ? object.split('') : object,
	length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
	index = -1,
	previousValue;

	if (1 in arguments) {
		previousValue = arguments[1];
	} else {
		while (++index < length && !(index in arraylike)) {}

		if (index >= length) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = arraylike[index];
	}

	while (++index < length) {
		if (index in arraylike) {
			previousValue = callback(previousValue, arraylike[index], index, object);
		}
	}

	return previousValue;
};
