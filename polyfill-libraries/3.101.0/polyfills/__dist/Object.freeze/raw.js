
// Object.freeze
/* global CreateMethodProperty */
// 19.1.2.6. Object.freeze ( O )
CreateMethodProperty(Object, 'freeze', function freeze(O) {
	// This feature cannot be implemented fully as a polyfill.
	// We choose to silently fail which allows "securable" code
	// to "gracefully" degrade to working but insecure code.
	return O;
});
