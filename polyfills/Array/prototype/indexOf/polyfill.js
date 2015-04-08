Array.prototype.indexOf = function indexOf(searchElement) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	var
	arraylike = this instanceof String ? this.split('') : this,
	length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
	index = Number(arguments[1]) || 0;

	index = (index < 0 ? Math.max(length + index, 0) : index) - 1;

	while (++index < length) {
		if (index in arraylike && arraylike[index] === searchElement) {
			return index;
		}
	}

	return -1;
};
