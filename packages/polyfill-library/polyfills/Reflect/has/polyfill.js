Object.defineProperty(Reflect, 'has', {
	value: function has(target, propertyKey) {
		return propertyKey in target;
	},
	configurable: true,
	writable: true
});
