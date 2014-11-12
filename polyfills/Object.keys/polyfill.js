(function (hasOwnProperty, objectEnumerables) {
	Object.keys = function keys(object) {
		if (object !== Object(object)) {
			throw new TypeError(object + ' is not an object');
		}

		var buffer = [], key;

		for (key in object) {
			if (hasOwnProperty.call(object, key)) {
				buffer.push(key);
			}
		}

		for (key in objectEnumerables) {
			if (hasOwnProperty.call(object, key.slice(1))) {
				buffer.push(key);
			}
		}

		return buffer;
	};
})(Object.prototype.hasOwnProperty, {
	_constructor: 0,
	_hasOwnProperty: 0,
	_isPrototypeOf: 0,
	_propertyIsEnumerable: 0,
	_toString: 0,
	_toLocaleString: 0,
	_valueOf: 0
});
