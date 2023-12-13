
// Number.Epsilon
// 20.1.2.1. Number.EPSILON
// The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately 2.2204460492503130808472633361816 x 10-16.
// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
Object.defineProperty(Number, 'EPSILON', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: Math.pow(2, -52)
});
