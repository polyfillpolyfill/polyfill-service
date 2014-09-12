// Array.from
Array.from = function from(arrayLike, callback, scope) {
	var array = Array.prototype.slice.call(arrayLike);

	return callback ? array.map(callback, scope) : array;
};
