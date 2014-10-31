Object.create = function create(prototype, properties) {
	/* jshint evil: true */

	if (!(prototype instanceof Object || prototype === null)) {
		throw new TypeError('Object prototype may only be an Object or null');
	}

	var
	object = new Function('e', 'function Object() {}Object.prototype=e;return new Object')(prototype);

	object.constructor.prototype = prototype;

	if (1 in arguments) {
		Object.defineProperties(object, properties);
	}

	return object;
};
