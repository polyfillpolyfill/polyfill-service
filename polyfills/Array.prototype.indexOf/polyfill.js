// Array.prototype.indexOf
Array.prototype.indexOf = function indexOf(searchElement) {
	var array = this, length = array.length, index = parseInt(arguments[1]) || 0;

	index = index >= 0 ? index : Math.max(length + index, 0);

	for (; index < length; ++index) {
		if (index in array && array[index] === searchElement) {
			return index;
		}
	}

	return -1;
};
