
// NodeList.prototype.@@iterator
/* global Symbol, ArrayIterator*/
NodeList.prototype[Symbol.iterator] = function () {
	return new ArrayIterator(this);
};
