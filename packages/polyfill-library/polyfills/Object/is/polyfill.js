/* global CreateMethodProperty, SameValue */
// 19.1.2.12. Object.is ( value1, value2 )
CreateMethodProperty(Object, 'is', function is(value1, value2) {
	// 1. Return SameValue(value1, value2).
	return SameValue(value1, value2);
});
