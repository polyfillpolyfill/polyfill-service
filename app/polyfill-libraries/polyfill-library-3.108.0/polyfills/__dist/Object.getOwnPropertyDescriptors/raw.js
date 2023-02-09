
// Object.getOwnPropertyDescriptors
/* global CreateMethodProperty, Reflect, ToObject, CreateDataProperty */

// 19.1.2.9. Object.getOwnPropertyDescriptors ( O )
CreateMethodProperty(
	Object,
	'getOwnPropertyDescriptors',
	function getOwnPropertyDescriptors(O) {
		// 1. Let obj be ? ToObject(O).
		var obj = ToObject(O);
		// 2. Let ownKeys be ? obj.[[OwnPropertyKeys]]().
		var ownKeys = Reflect.ownKeys(obj);
		// 3. Let descriptors be ! ObjectCreate(%ObjectPrototype%).
		var descriptors = {};
		// 4. For each element key of ownKeys in List order, do
		var length = ownKeys.length;
		for (var i = 0; i < length; i++) {
			var key = ownKeys[i];
			// a. Let desc be ? obj.[[GetOwnProperty]](key).
			// b. Let descriptor be ! FromPropertyDescriptor(desc).
			var descriptor = Object.getOwnPropertyDescriptor(O, key);
			// c. If descriptor is not undefined, perform ! CreateDataProperty(descriptors, key, descriptor).
			if (descriptor !== undefined) {
				CreateDataProperty(descriptors, key, descriptor);
			}
		}
		// 5. Return descriptors.
		return descriptors;
	}
);
