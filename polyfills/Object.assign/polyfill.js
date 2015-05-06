Object.assign = function assign(target, source) {
	for (var index = 1, key, src; index < arguments.length; ++index) {
		src = arguments[index];

		for (key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}

	return target;
};
