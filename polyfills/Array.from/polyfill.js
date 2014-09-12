// Array.from
Array.from = function from(arrayLike) {
	var array = Array.prototype.slice.call(arrayLike), callback = arguments[1];

	return typeof callback === 'function' ? array.map(callback, arguments[2]) : array;
};
