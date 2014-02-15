// Object.getOwnPropertyNames
Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
	var buffer = [], key;

	for (key in object) {
		buffer.push(key);
	}

	return buffer;
};
