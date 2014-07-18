// Array.prototype.lastIndexOf
Array.prototype.lastIndexOf = function lastIndexOf(searchElement) {
	for (var array = this, index = array.length - 1; index > -1; --index) {
		if (array[index] === searchElement) {
			return index;
		}
	}

	return -1;
};
