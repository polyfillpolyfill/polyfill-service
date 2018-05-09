(function (Object, TypeError) {
	function isObject(it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	}

	function anObject(it) {
		if (!isObject(it)) {
			throw new TypeError(it + ' is not an object!');
		}
	}

	function check(O, proto) {
		anObject(O);
		if (!isObject(proto) && proto !== null) {
			throw new TypeError(proto + ": can't set as prototype!");
		}
	}

	Object.defineProperty(Reflect, 'setPrototypeOf', {
		value: function setPrototypeOf(target, proto) {
			check(target, proto);
			try {
				Object.setPrototypeOf(target, proto);

				return true;
			} catch (e) {
				return false;
			}
		},
		configurable: true,
		writable: true
	});

})(Object, TypeError);
