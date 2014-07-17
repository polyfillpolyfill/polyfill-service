// Object.create
Object.create = function create(prototype, properties) {
	if (typeof prototype !== 'object') {
		throw new Error('Object prototype may only be an Object or null');
	}

	var Constructor = function () {};

	Constructor.prototype = prototype;

	var object = new Constructor();

	Object.defineProperties(object, properties);

	return object;
};
