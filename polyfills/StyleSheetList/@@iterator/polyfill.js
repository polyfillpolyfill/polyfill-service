/* global Symbol, ArrayIterator, StyleSheetList */
StyleSheetList.prototype[Symbol.iterator] = function values () {
	return new ArrayIterator(this);
};
