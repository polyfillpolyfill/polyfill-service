// Array.prototype.some
Array.prototype.some = function some(callback, scope) {
	for (var array = this, index = 0, length = array.length; index < length; ++index) {
		if (index in array && callback.call(scope, array[index], index, array)) {
			return true;
		}
	}

	return false;
};
