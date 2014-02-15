// Array.prototype.reduce
Array.prototype.reduce = function reduce(callback, initialValue) {
	var array = this, previousValue = initialValue || 0;

	for (var index = 0, length = array.length; index < length; ++index) {
		previousValue = callback.call(window, previousValue, array[index], index, array);
	}

	return previousValue;
};
