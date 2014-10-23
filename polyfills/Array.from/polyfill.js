(function () {
	Array.from = function from(source) {
		if (source === undefined || source === null) {
			throw new TypeError(source + ' is not an object');
		}

		var
		sourceIsString = typeof source === 'string',
		object = Object(source),
		map = arguments[1],
		scope = arguments[2],
		index = -1,
		array = [],
		length, value;

		if (1 in arguments && typeof map !== 'function') {
			throw new TypeError(map + ' is not a function');
		}

		length = Number(object.length) || 0;

		if (length === Infinity) {
			throw new RangeError(length + ' is not a valid length');
		}

		length = Math.min(Math.max(length, 0), Math.pow(2, 53) - 1);

		while (++index < length) {
			if (sourceIsString || index in object) {
				value = sourceIsString ? object.charAt(index) : object[index];

				array[index] = map ? map.call(scope, value, index) : value;
			}
		}

		array.length = length;

		return array;
	};
})();
