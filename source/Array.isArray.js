Array.isArray = function isArray(array) {
	return array && Object.prototype.toString.call(array).slice(8, -1) === 'Array';
};