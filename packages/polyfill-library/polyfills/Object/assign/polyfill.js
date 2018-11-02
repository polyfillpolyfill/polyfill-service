/* global CreateMethodProperty, ToObject */

// Object.assign
// 19.1.2.1 Object.assign ( target )

CreateMethodProperty(Object, "assign", function assign(target) {
	var to = ToObject(target);
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return to;
});
