
// Array.prototype.contains
Object.defineProperty(Array.prototype, 'contains', {
	value: Array.prototype.includes,
	enumerable: false,
	configurable: true,
	writeable: true
});
