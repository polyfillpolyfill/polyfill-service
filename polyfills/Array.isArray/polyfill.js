// Array.isArray
Array.isArray = function isArray(object) {
	return Object.prototype.toString.call(object) === '[object Array]';
};
