(function (max, min) {
	Object.defineProperty(Array.prototype, 'contains', {
		configurable: true,
		value: function contains(searchElement) {
			if (this === undefined || this === null) {
				throw new TypeError(this + 'is not an object');
			}

			var
			arraylike = this instanceof String ? this.split('') : this,
			length = max(min(arraylike.length, 9007199254740991), 0) || 0,
			index = Number(arguments[1]) || 0,
			isANaN = isNaN(searchElement);

			index = (index < 0 ? max(length + index, 0) : index) - 1;

			while (++index < length) {
				if (index in arraylike && (isANaN ? isNaN(arraylike[index]) : arraylike[index] === searchElement)) {
					return true;
				}
			}

			return false;
		},
		writable: true
	});
})(Math.max, Math.min);
