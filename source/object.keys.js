// Object.keys
Object.keys = function (object) {
	var names = [], key;

	for (key in object) {
		if (object.hasOwnProperty(key)) {
			names.push(key);
		}
	}

	return names;
};