// Array.prototype.forEach
Array.prototype.forEach = function forEach(callback) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (index in array) {
			callback.call(arguments[1], array[index], index, array);
		}
	}
};
