Array.prototype.reduceRight = function reduceRight(callback) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

    var array = Object(this),
        len = array.length >>> 0,
		index = len - 1,
        previousValue;

	if (arguments.length >= 2) {
		previousValue = arguments[1];
	} else {
		while (index >= 0 && !(index in array)) {
			--index;
		}

		if (index < 0) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		previousValue = array[index--];
	}

	for (; index >= 0; index--) {
      if (index in array) {
        previousValue = callback(previousValue, array[index], index, array);
      }
    }

	return previousValue;
};
