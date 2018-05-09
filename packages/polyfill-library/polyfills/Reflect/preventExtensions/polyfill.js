(function (Object) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	Object.defineProperty(Reflect, 'preventExtensions', {
		value: function preventExtensions(target) {
			if (!isObject(target)) {
				throw new TypeError('Target is not an object');
			}

			if (Object.preventExtensions) {
				try {
					Object.preventExtensions(target);
				} catch (e) {
					return false;
				}
			}

			return true;
		},
		configurable: true,
		writable: true
	});

})(Object);
