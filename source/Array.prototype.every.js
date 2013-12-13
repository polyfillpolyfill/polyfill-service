// Array.prototype.every
Array.prototype.every = function every(callback, scope) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (!callback.call(scope || window, array[index], index, array)) {
			break;
		}
	}

	return index === length;
};
