Object.assign = function (target, source) { // eslint-disable-line no-unused-vars

	if (typeof target === 'undefined' || target === null) {
		throw new TypeError('target must be an object');
	}

	for (var index = 1, key, src; index < arguments.length; ++index) {
		src = arguments[index];

		for (key in src) {
			if (Object.prototype.hasOwnProperty.call(src, key)) {
				target[key] = src[key];
			}
		}
	}

	return target;
};
