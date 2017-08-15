// Wrapped in IIFE to prevent leaking to global scope.
(function () {
	function parseIterable (arraylike) {
		var done = false;
		var iterableResponse;
		var tempArray = [];

		// if the iterable doesn't have next;
		// it is an iterable if 'next' is a function but it has not been defined on
		// the object itself.
		if (typeof arraylike.next === 'function') {
			while (!done) {
				iterableResponse = arraylike.next();
				if (typeof iterableResponse.done === 'boolean') {
					if (iterableResponse.done === true) {
						done = true;
						break;
					}
					//was using hasownProperty but changed as 'value' property might be inherited through prototype chain and could still be a valid iterable response
					if ('value' in iterableResponse){ 
						tempArray.push(iterableResponse.value);
					} else {
						break;
					}
				} else {
					// it does not conform to the iterable pattern
					break;
				}
			}
		}

		if (done) {
			return tempArray;
		} else {
			// something went wrong return false;
			return false;
		}
	}
	
	function iterateForEach(arraylike, asKeyValArrays) {
		if (typeof arraylike.forEach !== 'function') {
			return false;
		}
		var tempArray = [];
		var addEl = asKeyValArrays
			? function (val, key) { tempArray.push([key, val]); } 
			: function (val) { tempArray.push(val); };
		arraylike.forEach(addEl);
		return tempArray;
	}

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

			var arraylike = typeof source === 'string' ? source.split('') : Object(source);
			var map = arguments[1];
			var scope = arguments[2];
			var array = [];
			var index = -1;
			var length = Math.min(Math.max(Number(arraylike.length) || 0, 0), 9007199254740991);
			var value;

			// variables for rebuilding array from iterator
			var arrayFromIterable;

			// if it is an iterable treat like one
			arrayFromIterable = parseIterable(arraylike);

			//if it is a Map or a Set then handle them appropriately
			if (!arrayFromIterable) {
				if (arraylike instanceof Map) {
					arrayFromIterable = iterateForEach(arraylike, true);
				} else if (arraylike instanceof Set) {
					arrayFromIterable = iterateForEach(arraylike);
				}
			}

			if (arrayFromIterable) {
				arraylike = arrayFromIterable;
				length = arrayFromIterable.length;
			}

			while (++index < length) {
					value = arraylike[index];

					array[index] = map ? map.call(scope, value, index) : value;
			}

			array.length = length;

			return array;
		},
		writable: true
	});
}());
