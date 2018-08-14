(function (Object) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	var isExtensible$ = Object.isExtensible || function () {
		return true;
	};

	Object.defineProperty(Reflect, 'isExtensible', {
		value: function isExtensible(target) {
			if (!isObject(target)) {
				throw new TypeError('Target is not an object');
			}

			return isExtensible$(target);
		},
		configurable: true,
		writable: true
	});

})(Object);
