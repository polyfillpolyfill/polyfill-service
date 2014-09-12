// Object.create
Object.create = function create(prototype, properties) {
	/* jshint evil: true */

	if (prototype !== Object(prototype)) {
		throw new TypeError('Object prototype may only be an Object or null');
	}

	var
	name = typeof prototype === 'function' && Function.prototype.toString.call(prototype).match(/\s\w+/) || ' Object',
	object = new Function('e', 'function' + name + '(e){}' + name + '.prototype=e;return new' + name)(prototype);

	if (properties) {
		Object.defineProperties(object, properties);
	}

	return object;
};
