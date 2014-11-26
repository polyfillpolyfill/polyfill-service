Object.defineProperty(Array.prototype, 'contains', {
	configurable: true,
	value: function contains(searchElement) {
		if (this === undefined || this === null) {
			throw new TypeError(this + 'is not an object');
		}

		var
		iterable = this instanceof String ? this.split('') : this,
		length = Math.min(Math.max(parseInt(iterable.length, 10) || 0, 0), 9007199254740991),
		index = Number(arguments[1]) || 0,
		isANaN = isNaN(searchElement);

		index = (index < 0 ? max(length + index, 0) : index) - 1;

		while (++index < length) {
			if (index in iterable && (isANaN ? isNaN(iterable[index]) : iterable[index] === searchElement)) {
				return true;
			}
		}

		return false;
	},
	writable: true
});
