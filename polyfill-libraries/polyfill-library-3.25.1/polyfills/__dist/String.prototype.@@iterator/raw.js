
// String.prototype.@@iterator
/* global Symbol, StringIterator */
String.prototype[Symbol.iterator] = function () {
	return new StringIterator(this);
};
