// <Array>.filter
Array.prototype.filter = function filter(callback) {
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
	length = Number(arraylike.length) || 0,
	index = -1,
	result = [],
	element;

	while (++index < length) {
		element = arraylike[index];

		if (index in arraylike && callback.call(scope, element, index, object)) {
			result.push(element);
		}
	}

	return result;
};
