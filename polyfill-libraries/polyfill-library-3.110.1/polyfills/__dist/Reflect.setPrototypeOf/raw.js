
// Reflect.setPrototypeOf
/* global CreateMethodProperty, Reflect, Type, */
// 26.1.13 Reflect.setPrototypeOf ( target, proto )
CreateMethodProperty(Reflect, 'setPrototypeOf', function setPrototypeOf(target, proto) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// 2. If Type(proto) is not Object and proto is not null, throw a TypeError exception.
	if (Type(proto) !== "object" && proto !== null) {
		throw new TypeError(Object.prototype.toString.call(proto) + ' is not an Object or null');
	}

	if (target === proto) {
		return false;
	}
	// 3. Return ? target.[[SetPrototypeOf]](proto).
	try {
		Object.setPrototypeOf(target, proto);
		return Reflect.getPrototypeOf(target) === proto;
	} catch(_) {
		return false;
	}
});
