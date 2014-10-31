Array.prototype.reduceRight = function reduceRight(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	if (!(callback instanceof Function)) {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	arraylike = object instanceof String ? object.split('') : object,
	length = -1,
	index = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
	previousValue;

	if (1 in arguments) {
		previousValue = arguments[1];
	} else {
		while (--index > length && !(index in arraylike)) {}

		if (index <= length) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = arraylike[index];
	}

	while (--index > length) {
		if (index in arraylike) {
			previousValue = callback(previousValue, arraylike[index], index, object);
		}
	}

	return previousValue;
};
