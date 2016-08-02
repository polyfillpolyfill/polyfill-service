/* global Symbol, ArrayIterator*/
DOMTokenList.prototype[Symbol.iterator] = function values () {
	return new ArrayIterator(this);
};

