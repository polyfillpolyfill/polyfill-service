Array.prototype.reduce = function reduce(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	if (!(callback instanceof Function)) {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	iterable = object instanceof String ? object.split('') : object,
	length = Math.min(Math.max(parseInt(iterable.length, 10) || 0, 0), 9007199254740991),
	index = -1,
	previousValue;

	if (1 in arguments) {
		previousValue = arguments[1];
	} else {
		while (++index < length && !(index in iterable)) {}

		if (index >= length) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = iterable[index];
	}

	while (++index < length) {
		if (index in iterable) {
			previousValue = callback(previousValue, iterable[index], index, object);
		}
	}

	return previousValue;
};
