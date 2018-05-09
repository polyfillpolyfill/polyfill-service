Object.defineProperty(Reflect, 'deleteProperty', {
	value: function deleteProperty(target, propertyKey) {
		return delete target[propertyKey];
	},
	configurable: true,
	writable: true
});
