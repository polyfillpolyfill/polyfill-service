
// Object.assign
(function() {

	// 7.1.13 ToObject ( argument )
	function toObject(argument) {
    if (argument === null || argument === undefined) {
			throw new TypeError('Cannot call method on ' + argument);
		}
    return Object(argument);
  }

	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		// 19.1.2.1 Object.assign ( target, ...sources )
		value: function assign(target, source) { // eslint-disable-line no-unused-vars

			// 1. Let to be ? ToObject(target).
			var to = toObject(target);

			// 2. If only one argument was passed, return to.
			if (arguments.length === 1) {
				return to;
			}

			// 3. Let sources be the List of argument values starting with the second argument
			var sources = Array.prototype.slice.call(arguments, 1);

			// 4. For each element nextSource of sources, in ascending index order, do
			var index1;
			var index2;
			var keys;
			var key;
			var from;
			for (index1 = 0; index1 < sources.length; index1++) {
				var nextSource = sources[index1];
				// 4a. If nextSource is undefined or null, let keys be a new empty List.
				if (nextSource === undefined || nextSource === null) {
					keys = [];
					// 4b. Else,
				} else {
					// 4bi. Let from be ! ToObject(nextSource).
					from = toObject(nextSource);
					// 4bii. Let keys be ? from.[[OwnPropertyKeys]]().
					/*
						This step in our polyfill is not complying with the specification.
						[[OwnPropertyKeys]] is meant to return ALL keys, including non-enumerable and symbols.
						TODO: When we have Reflect.ownKeys, use that instead as it is the userland equivalent of [[OwnPropertyKeys]].
					*/
					keys = Object.keys(from);
				}

				// 4c. For each element nextKey of keys in List order, do
				for (index2 = 0; index2 < keys.length; index2++) {
					var nextKey = keys[index2];
					// 4ci. Let desc be ? from.[[GetOwnProperty]](nextKey).
					var desc = Object.getOwnPropertyDescriptor(from, nextKey);
					// 4cii. If desc is not undefined and desc.[[Enumerable]] is true, then
					if (desc !== undefined && desc.enumerable) {
						// 4cii1. Let propValue be ? Get(from, nextKey).
						var propValue = from[nextKey];
						// 4cii2. Perform ? Set(to, nextKey, propValue, true).
						to[nextKey] = propValue;
					}
				}
			}
			// 5. Return to.
			return to;
		}
	});
}());
