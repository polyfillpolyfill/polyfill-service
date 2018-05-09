Object.defineProperty(Reflect, 'deleteProperty', {
	value: function (target, propertyKey) {
		return delete target[propertyKey];
	},
	configurable: true,
	writable: true
});
