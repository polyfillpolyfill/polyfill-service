// Array.prototype.every
Array.prototype.every = function every(callback, scope) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (index in array && !callback.call(scope, array[index], index, array)) {
			return false;
		}
	}

	return true;
};
