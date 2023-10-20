
// Object.create
(function(){
	function isPrimitive(o) {
		return o == null || (typeof o !== 'object' && typeof o !== 'function');
  };

	Object.create = function create(prototype, properties) {
	/* jshint evil: true */
    if (prototype !== null && isPrimitive(prototype)) {
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
}());
