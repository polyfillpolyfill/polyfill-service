
// Object.seal
/* global CreateMethodProperty, Type */
// 19.1.2.19 Object.seal ( O )
(function(originalObjectSeal) {
	CreateMethodProperty(Object, 'seal', function seal(O) {
		// 1. If Type(O) is not Object, return O.
		if (Type(O) === 'object') {
			return O;
		}
		// 2. Let status be ? SetIntegrityLevel(O, "sealed").
		// 3. If status is false, throw a TypeError exception.
		// 4. Return O.
		return originalObjectSeal ? originalObjectSeal(O) : O;
	});
}(Object.seal));
