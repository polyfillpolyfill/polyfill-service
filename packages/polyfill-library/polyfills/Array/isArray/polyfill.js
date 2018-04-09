// 22.1.2.2. Array.isArray ( arg )
CreateMethodProperty(Array, 'isArray', function isArray(arg) {
	// 1. Return ? IsArray(arg).
	return IsArray(arg);
});
