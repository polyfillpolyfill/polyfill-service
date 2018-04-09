/* global Symbol, ArrayIterator*/
DOMTokenList.prototype[Symbol.iterator] = function () {
	return new ArrayIterator(this);
};
