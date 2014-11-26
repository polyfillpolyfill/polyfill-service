Array.prototype.lastIndexOf = function lastIndexOf(searchElement) {
	if (this === undefined || this === null) {
		throw new TypeError(this + 'is not an object');
	}

	var
	iterable = this instanceof String ? this.split('') : this,
	length = Math.min(Math.max(parseInt(iterable.length, 10) || 0, 0), 9007199254740991),
	index = Number(arguments[1]) || 0;

	index = 1 in arguments ? (index < 0 ? Math.max(length + index, 0) : index) + 1 : length;

	while (--index >= 0) {
		if (index in iterable && iterable[index] === searchElement) {
			return index;
		}
	}

	return -1;
};
