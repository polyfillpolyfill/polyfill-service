Object.defineProperty(Array.prototype, 'fill', {
	configurable: true,
	value: function fill(value) {
		if (this === undefined || this === null) {
			throw new TypeError(this + ' is not an object');
		}

		var arrayLike = this instanceof String ? this.split('') : Object(this);

		var length = Math.max(Math.min(arrayLike.length, 9007199254740991), 0) || 0;

		var relativeStart = 1 in arguments ? Math.floor(Number(arguments[1])) || 0 : 0;

		relativeStart = relativeStart < 0 ? Math.max(length + relativeStart, 0) : Math.min(relativeStart, length);

		var relativeEnd = 2 in arguments && arguments[2] !== undefined ? Math.floor(Number(arguments[2])) || 0 : length;

		relativeEnd = relativeEnd < 0 ? Math.max(length + arguments[2], 0) : Math.min(relativeEnd, length);

		while (relativeStart < relativeEnd) {
			arrayLike[relativeStart] = value;

			++relativeStart;
		}

		return arrayLike;
	},
	writable: true
});
