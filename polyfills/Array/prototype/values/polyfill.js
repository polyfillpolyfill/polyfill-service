/* global Symbol */
Array.prototype.values = Object.defineProperty(Array.prototype, 'values', {
	value: Array.prototype[Symbol.iterator],
	enumerable: false,
	writable: false
});
