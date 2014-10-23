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
	length = array.length,
	index = 0,
	previousValue;

	while (index < length && !(arrayIsString || index in array)) {
		++index;
	}

	previousValue = 1 in arguments ? arguments[1] : arrayIsString ? array.charAt(index) : array[index];

	if (!length || index === length) {
		throw new TypeError('Reduce of empty array with no initial value');
	}

	for (++index; index < length; ++index) {
		if (arrayIsString || index in array) {
			previousValue = callback(previousValue, arrayIsString ? array.charAt(index) : array[index], index, array);
		}
	}

	return previousValue;
};
