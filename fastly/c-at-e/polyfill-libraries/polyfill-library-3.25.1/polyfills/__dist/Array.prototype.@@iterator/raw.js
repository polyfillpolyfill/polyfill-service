
// Array.prototype.@@iterator
/* global Symbol, ArrayIterator*/
Array.prototype[Symbol.iterator] = function values () {
	return new ArrayIterator(this);
};
