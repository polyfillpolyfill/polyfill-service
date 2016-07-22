/* global ArrayIterator*/
Array.prototype.keys = function keys () {
	return new ArrayIterator(this, 'key');
};
