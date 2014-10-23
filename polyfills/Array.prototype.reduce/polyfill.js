Array.prototype.reduce = function reduce(callback) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	array = Object(this),
	arrayIsString = array instanceof String,
	length = Number(array.length) || 0,
	index = 0,
	previousValue;

	if (1 in arguments) {
		previousValue = arguments[1];
	} else {
		if (!arrayIsString) {
			while (index < length && !(index in array)) {
				++index;
			}
		}

		if (!length || index === length) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = arrayIsString ? array.charAt(index) : array[index];

		++index;
	}

	for (; index < length; ++index) {
		if (arrayIsString || index in array) {
			previousValue = callback(previousValue, arrayIsString ? array.charAt(index) : array[index], index, array);
		}
	}

	return previousValue;
};
