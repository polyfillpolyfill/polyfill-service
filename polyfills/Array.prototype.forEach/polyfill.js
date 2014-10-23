Array.prototype.forEach = function forEach(callback) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	array = Object(this),
	arrayIsString = array instanceof String,
	scope = arguments[1],
	length = array.length,
	index = 0;

	for (; index < length; ++index) {
		if (arrayIsString || index in array) {
			callback.call(scope, arrayIsString ? array.charAt(index) : array[index], index, array);
		}
	}
};