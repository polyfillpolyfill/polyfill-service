
// Object.entries
Object.entries = function entries(object) {
	var keys = Object.keys(object);

	return keys
		.reduce(function(entries, key) {
			var entry = typeof key === 'string' && object.propertyIsEnumerable(key) ? [
				[key, object[key]]
			] : [];
			return entries.concat(entry);
		}, []);
};
