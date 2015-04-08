Array.prototype.map = function map(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	if (!(callback instanceof Function)) {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	arraylike = object instanceof String ? object.split('') : object,
	length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
	index = -1,
	result = [],
	element;

	while (++index < length) {
		if (index in arraylike) {
			result[index] = callback.call(scope, arraylike[index], index, object);
		}
	}

	return result;
};
