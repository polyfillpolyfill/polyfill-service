Array.prototype.reduce = function reduce(callback) {
	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var array = this, length = array.length, index = 0, previousValue;

	while (index < length && !(index in array)) {
		++index;
	}

	previousValue = 2 in arguments ? arguments[2] : array[index];

	for (++index; index < length; ++index) {
		if (index in array) {
			previousValue = callback(previousValue, array[index], index, array);
		}
	}

	return previousValue;
};
