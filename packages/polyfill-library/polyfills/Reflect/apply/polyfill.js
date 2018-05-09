(function(){
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	Object.defineProperty(Reflect, 'apply', {
		value: function apply(target, thisArg, argList) {
			if (!isObject(argList)) {
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
})();
