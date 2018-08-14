(function (Object) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	Object.defineProperty(Reflect, 'getOwnPropertyDescriptor', {
		value: function getOwnPropertyDescriptor(target, propertyKey) {
			if (!isObject(target)) {
				throw new TypeError('Target is not an object');
			}

			return Object.getOwnPropertyDescriptor(target, propertyKey);
		},
		configurable: true,
		writable: true
	});
})(Object);
