Array.prototype.reduceRight = function reduceRight(callback) {
	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var array = this, index = array.length - 1, previousValue;

	while (index >= 0 && !(index in array)) {
		--index;
	}

	previousValue = 2 in arguments ? arguments[2] : array[index];

	for (--index; index >= 0; --index) {
		if (index in array) {
			previousValue = callback(previousValue, array[index], index, array);
		}
	}

	return previousValue;
};
