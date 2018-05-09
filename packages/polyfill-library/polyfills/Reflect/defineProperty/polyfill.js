Object.defineProperty(Reflect, 'defineProperty', {
	value: function (target, propertyKey, attributes) {
		try {
			Object.defineProperty(target, propertyKey, attributes);

			return true;
		} catch(e) {
			return false;
		}
	},
	configurable: true,
	writable: true
});
