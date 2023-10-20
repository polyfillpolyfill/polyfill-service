
// Reflect.ownKeys
/* global CreateMethodProperty, Reflect, Type */
// 26.1.10 Reflect.ownKeys ( target )
CreateMethodProperty(Reflect, 'ownKeys', function ownKeys(target) {
	// 1. If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "object") {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not an Object');
	}
	// polyfill-library - These steps are taken care of by Object.getOwnPropertyNames.
	// 2. Let keys be ? target.[[OwnPropertyKeys]]().
	// 3. Return CreateArrayFromList(keys).
	return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
});
