// 19.1.2.21. Object.values ( O )
CreateMethodProperty(Object, 'values', function values(O) {
	// 1. Let obj be ? ToObject(O).
	var obj = ToObject(O);
	// 2. Let nameList be ? EnumerableOwnProperties(obj, "value").
	var nameList = Object.keys(obj).map(function (key) {
		return obj[key];
	});
	// 3. Return CreateArrayFromList(nameList).
	// Polyfill.io - nameList is already an array.
	return nameList;
});
