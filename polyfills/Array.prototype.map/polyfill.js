// Array.prototype.map
Array.prototype.map = function map(callback, scope) {
	for (var array = this, result = [], index = 0, length = array.length, element; index < length; ++index) {
		if (index in array) {
			result.push(callback.call(scope, array[index], index, array));
		}
	}

	return result;
};

