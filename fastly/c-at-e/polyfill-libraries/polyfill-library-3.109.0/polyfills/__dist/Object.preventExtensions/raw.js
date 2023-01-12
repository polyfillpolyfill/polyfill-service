
// Object.preventExtensions
/* global CreateMethodProperty, Type */
(function (nativePreventExtensions) {
	// 19.1.2.17 Object.preventExtensions ( O )
	CreateMethodProperty(Object, 'preventExtensions', function preventExtensions(O) {
		// 1. If Type(O) is not Object, return O.
		if (Type(O) !== "object") {
			return O;
		}
		// 2. Let status be ? O.[[PreventExtensions]]().
		if (nativePreventExtensions) {
			nativePreventExtensions(O);
		}
		// 3. If status is false, throw a TypeError exception.
		// 4. Return O.
		return O;
	});
}(Object.preventExtensions));
