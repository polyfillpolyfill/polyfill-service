Object.freeze = function freeze(object) {
	if (Object(object) !== object) {
		throw new TypeError('Object.freeze can only be called on Objects.');
	}
	// This feature cannot be implemented fully as a polyfill.
	// We choose to silently fail which allows "securable" code
	// to "gracefully" degrade to working but insecure code.
	return object;
};
