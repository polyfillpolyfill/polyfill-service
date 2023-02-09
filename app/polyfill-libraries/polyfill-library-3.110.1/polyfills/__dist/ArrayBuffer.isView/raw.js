
// ArrayBuffer.isView
/* global ArrayBuffer, CreateMethodProperty, Type */
// 25.1.4.1 ArrayBuffer.isView ( arg )
CreateMethodProperty(ArrayBuffer, 'isView', function isView (arg) {
	// 1. If Type(arg) is not Object, return false.
	if (Type(arg) !== 'object') {
		return false;
	}
	// 2. If arg has a [[ViewedArrayBuffer]] internal slot, return true.
	// 3. Return false.
	return arg.buffer instanceof ArrayBuffer;
});
