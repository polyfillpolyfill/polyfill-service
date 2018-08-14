(function (Object) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	var getOwnPropertySymbols$ = Object.getOwnPropertySymbols || function () {
		return [];
	};

	Object.defineProperty(Reflect, 'ownKeys', {
		value: function ownKeys(target) {
			if (!isObject(target)) {
				throw new TypeError('Target is not an object');
			}

			return Object.getOwnPropertyNames(target).concat(getOwnPropertySymbols$(target));
		},
		configurable: true,
		writable: true
	});

})(Object);
