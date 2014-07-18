// Array.from
Array.from = function from(arrayLike, callback, scope) {
	var
	array = [].slice.call(arrayLike);

	return callback ? array.map(callback, scope) : array;
};
