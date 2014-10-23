Array.prototype.lastIndexOf = function lastIndexOf(searchElement) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	var
	array = this,
	arrayIsString = array instanceof String,
	length = array.length,
	index = 1 in arguments ? Number(arguments[1]) || 0 : length - 1;

	index = index >= 0 ? index : Math.max(length + index, 0);

	for (; index >= 0; --index) {
		if ((
			arrayIsString && array.charAt(index) === searchElement
		) || (
			index in array && array[index] === searchElement
		)) {
			return index;
		}
	}

	return -1;
};
