
// Number.MAX_SAFE_INTEGER
// 20.1.2.6. Number.MAX_SAFE_INTEGER
// The value of Number.MAX_SAFE_INTEGER is 9007199254740991 (2^53-1).
// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
Object.defineProperty(Number, 'MAX_SAFE_INTEGER', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: Math.pow(2, 53) - 1
});
