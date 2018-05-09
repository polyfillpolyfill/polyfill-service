Object.defineProperty(Reflect, 'getPrototypeOf', {
	value: Object.getPrototypeOf,
	configurable: true,
	writable: true
});
