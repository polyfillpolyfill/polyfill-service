(function (slice) {
	Object.defineProperty(Array, 'of', {
		configurable: true,
		value: function of() {
			return slice.call(arguments);
		},
		writable: true
	});
})(Array.prototype.slice);
