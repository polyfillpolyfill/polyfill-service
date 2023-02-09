
// Array.prototype.values
/* global Symbol */
Object.defineProperty(Array.prototype, 'values', {
	value: Array.prototype[Symbol.iterator],
	enumerable: false,
	writable: false
});
