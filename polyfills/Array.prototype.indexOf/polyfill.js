Array.prototype.indexOf = function indexOf(searchElement) {
	if (!(this instanceof Object)) {
		throw new TypeError(this + 'is not an object');
	}

	var
	array = this,
	arrayIsString = array instanceof String,
	length = array.length, 
	index = Number(arguments[1]) || 0;

	for (index = index >= 0 ? index : Math.max(length + index, 0); index < length; ++index) {
		if ((
			arrayIsString && array.charAt(index) === searchElement
		) || (
			index in array && array[index] === searchElement
		)) {
			return index;
		}
	}

	return -1;
};
