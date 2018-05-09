Object.defineProperty(Reflect, 'apply', {
	value: function (target, thisArg, argList) {
		if (argList === null || typeof argList !== 'object') {
			throw new TypeError('Argument list is not array-like.');
		}
		if (typeof target !== 'function') {
			throw new TypeError('Target is not a function');
		}

		return target.apply(thisArg, argList);
	},
	configurable: true,
	writable: true
});
