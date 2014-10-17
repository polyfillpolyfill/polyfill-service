Array.prototype.forEach = function forEach(callback) {
	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (index in array) {
			callback.call(arguments[1], array[index], index, array);
		}
	}
};
