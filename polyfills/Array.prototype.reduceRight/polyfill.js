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
	length = Number(array.length) || 0,
	index = length - 1,
	previousValue;

	if (1 in arguments) {
		previousValue = arguments[1];
	} else {
		if (arrayIsString) {
			index = length - 1;
		} else {
			while (index >= 0 && !(index in array)) {
				--index;
			}
		}

		if (index < 0) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = arrayIsString ? array.charAt(index) : array[index];

		--index;
	}

	for (; index >= 0; --index) {
		if (arrayIsString || index in array) {
			previousValue = callback(previousValue, arrayIsString ? array.charAt(index) : array[index], index, array);
		}
	}

	return previousValue;
};
