Array.prototype.reduceRight = function reduceRight(callback) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	array = Object(this),
	arrayIsString = array instanceof String,
	index = array.length - 1,
	previousValue;

	while (index >= 0 && !(arrayIsString || index in array)) {
		--index;
	}

	previousValue = 1 in arguments ? arguments[1] : array[index];

	for (--index; index >= 0; --index) {
		if (arrayIsString || index in array) {
			previousValue = callback(previousValue, arrayIsString ? array.charAt(index) : array[index], index, array);
		}
	}

	return previousValue;
};
