// Based on: https://github.com/es-shims/es5-shim/blob/master/es5-sham.js

// https://github.com/es-shims/es5-shim/issues#issue/2
// http://ejohn.org/blog/objectgetprototypeof/
// recommended by fschaefer on github
//
// sure, and webreflection says ^_^
// ... this will nerever possibly return null
// ... Opera Mini breaks here with infinite loops
CreateMethodProperty(Object, 'getPrototypeOf', function getPrototypeOf(object) {
	if (object !== Object(object)) {
		throw new TypeError('Object.getPrototypeOf called on non-object');
	}
	var proto = object.__proto__;
	if (proto || proto === null) {
		return proto;
	} else if (typeof object.constructor == 'function' && object instanceof object.constructor) {
    return object.constructor.prototype;
  } else if (object instanceof Object) {
		return Object.prototype;
	} else {
		// Correctly return null for Objects created with `Object.create(null)`
		// (shammed or native) or `{ __proto__: null}`.  Also returns null for
		// cross-realm objects on browsers that lack `__proto__` support (like
		// IE <11), but that's the best we can do.
		return null;
	}
});
