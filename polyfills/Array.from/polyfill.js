Object.defineProperty(Array, 'from', {
	configurable: true,
	value: function from(source) {
		// handle non-objects
		if (source === undefined || source === null) {
			throw new TypeError(source + ' is not an object');
		}

		// handle maps that are not functions
		if (1 in arguments && !(arguments[1] instanceof Function)) {
			throw new TypeError(arguments[1] + ' is not a function');
		}

		var
		arraylike = typeof source === 'string' ? source.split('') : Object(source),
		map = arguments[1],
		scope = arguments[2],
		array = [],
		index = -1,
		length = Math.min(Math.max(Number(arraylike.length) || 0, 0), 9007199254740991),
		value;

		while (++index < length) {
			if (index in arraylike) {
				value = arraylike[index];

				array[index] = map ? map.call(scope, value, index) : value;
			}
		}

		array.length = length;

		return array;
	},
	writable: true
});
