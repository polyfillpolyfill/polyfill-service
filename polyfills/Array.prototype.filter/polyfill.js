// Array.prototype.filter
Array.prototype.filter = function filter(callback, scope) {
	for (var array = this, result = [], index = 0, length = array.length; index < length; ++index) {
		if (index in array && callback.call(scope, array[index], index, array)) {
			result.push(array[index]);
		}
	}

	return result;
};
