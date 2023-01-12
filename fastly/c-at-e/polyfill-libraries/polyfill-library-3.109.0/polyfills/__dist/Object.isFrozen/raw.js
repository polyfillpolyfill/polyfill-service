
// Object.isFrozen
/* global CreateMethodProperty, Type */
(function (nativeIsFrozen) {
	// 19.1.2.14 Object.isFrozen ( O )
	CreateMethodProperty(Object, 'isFrozen', function isFrozen(O) {
		// 1. If Type(O) is not Object, return true.
		if (Type(O) !== "object") {
			return true;
		}
		// 2. Return ? TestIntegrityLevel(O, "frozen").
		return nativeIsFrozen ? nativeIsFrozen(O) : false;
	});
}(Object.isFrozen));
