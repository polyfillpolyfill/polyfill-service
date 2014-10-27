(function (toString) {
	// Array.isArray
	Array.isArray = function isArray(object) {
		return toString.call(object) === '[object Array]';
	};
})(Object.prototype.toString);
