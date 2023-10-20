
// Array.prototype.entries
Object.defineProperty(Array.prototype, 'entries', {
	value: function () {
		return new ArrayIterator(this, 'key+value');
	}
});
