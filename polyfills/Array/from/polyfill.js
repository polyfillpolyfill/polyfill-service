
// Wrapped in IIFE to prevent leaking to global scope.
(function () {
	var mozIterator = '@@iterator';
	var hasSymbol = typeof Symbol === 'function';
	var hasMozIterator = typeof [][mozIterator] === 'function';
	function parseIterable(arraylike) {
		var iterator = findIterator(arraylike);
		if (typeof arraylike[iterator] !== 'function') {
			return typeof arraylike === 'string'
				? arraylike.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || []
				: undefined;
		}
		var array = [];
		var iter = arraylike[iterator]();
		while (true) {
			var result = iter.next();
			if (result.done) return array;
			array.push(result.value);
		}

	}
	function findIterator(arraylike) {
		if (hasSymbol && typeof arraylike[Symbol.iterator] === 'function') {
			return Symbol.iterator;
		}
		if (hasMozIterator && typeof arraylike[mozIterator] === 'function') {
			return mozIterator;
		}
	}

	Object.defineProperty(Array, 'from', {
		configurable: true,
		value: function from(source) {
			// handle non-objects
			if (source === undefined || source === null) {
				throw new TypeError(source + ' is not an object');
			}

			// handle maps that are not functions
			if (arguments[1] !== void 0 && typeof arguments[1] !== 'function') {
				throw new TypeError(arguments[1] + ' is not a function');
			}

			var arraylike = parseIterable(source) || source;
			var map = arguments[1];
			var context = arguments[2];
			var array = [];

			// variables for rebuilding array from iterator
			for (var index = 0; index < arraylike.length; ++index) {
				array[index] = map ? map.call(context, arraylike[index], index) : arraylike[index];
			}
			return array;
		},
		writable: true
	});
}());
