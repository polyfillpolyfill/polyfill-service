Object.freeze = function freeze(object) {
	// In ES5, if the argument to this method is not an object (a primitive),
	// then it will cause a TypeError.In ES2015, a non- object argument will
	// be treated as if it were a frozen ordinary object, and be simply returned.
	// if (Object(object) !== object) {
	// 	throw new TypeError('Object.freeze can only be called on Objects.');
	// }
	// This feature cannot be implemented fully as a polyfill.
	// We choose to silently fail which allows "securable" code
	// to "gracefully" degrade to working but insecure code.
	return object;
};
