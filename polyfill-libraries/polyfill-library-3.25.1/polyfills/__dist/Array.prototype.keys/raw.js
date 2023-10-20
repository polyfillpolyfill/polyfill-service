
// Array.prototype.keys
/* global ArrayIterator*/
Object.defineProperty(Array.prototype, 'keys', {
	value: function () {
		return new ArrayIterator(this, 'key');
	}
});
