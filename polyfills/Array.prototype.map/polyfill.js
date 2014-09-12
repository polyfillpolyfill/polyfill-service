// Array.prototype.map
Array.prototype.map = function map(callback) {
	for (var array = this, result = [], index = 0, length = array.length, element; index < length; ++index) {
		if (index in array) {
			result.push(callback.call(arguments[1], array[index], index, array));
		}
	}

	return result;
};

