Object.defineProperty(HTMLDocument.prototype, 'head', {
	get: function () {
		return this.getElementsByTagName('head')[0];
	}
});
