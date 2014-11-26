Array.prototype.forEach = function forEach(callback) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	if (!(callback instanceof Function)) {
		throw new TypeError(callback + ' is not a function');
	}

	var
	object = Object(this),
	scope = arguments[1],
	iterable = object instanceof String ? object.split('') : object,
	length = Math.min(Math.max(parseInt(iterable.length, 10) || 0, 0), 9007199254740991),
	index = -1,
	result = [],
	element;

	while (++index < length) {
		if (index in iterable) {
			callback.call(scope, iterable[index], index, object);
		}
	}
};
