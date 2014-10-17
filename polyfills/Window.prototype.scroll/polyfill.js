Object.defineProperties(Window.prototype, {
	'scrollX': {
		get: function () {
			return this.pageXOffset;
		}
	},
	'scrollY': {
		get: function () {
			return this.pageYOffset;
		}
	}
});
