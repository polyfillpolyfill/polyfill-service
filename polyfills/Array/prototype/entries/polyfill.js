Array.prototype.entries = function entries () {
	return new ArrayIterator(this, 'key+value');
};
