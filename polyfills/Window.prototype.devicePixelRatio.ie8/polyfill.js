// Window.prototype.devicePixelRatio
Object.defineProperty(window.prototype, 'devicePixelRatio', {
	get: function () {
		return screen.deviceXDPI / screen.logicalXDPI;
	}
});
