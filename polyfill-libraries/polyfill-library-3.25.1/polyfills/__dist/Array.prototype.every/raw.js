
// Array.prototype.every
Array.prototype.every = function every(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + ' is not an object');
	}

	if (typeof callback !== 'function') {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	arraylike = object instanceof String ? object.split('') : object,
	length = Number(arraylike.length) || 0,
	index = -1;

	while (++index < length) {
		if (index in arraylike && !callback.call(scope, arraylike[index], index, object)) {
			return false;
		}
	}

	return true;
};
