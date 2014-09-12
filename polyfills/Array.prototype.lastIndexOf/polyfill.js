// Array.prototype.lastIndexOf
Array.prototype.lastIndexOf = function lastIndexOf(searchElement) {
	var array = this, length = array.length, index = 1 in arguments ? length : parseInt(arguments[1]) || 0;

	index = index >= 0 ? index : Math.max(length + index, 0);

	for (; index >= 0; --index) {
		if (index in array && array[index] === searchElement) {
			return index;
		}
	}

	return -1;
};
