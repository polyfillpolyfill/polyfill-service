Object.defineProperty(Window.prototype, 'devicePixelRatio', {
	get: function () {
		return screen.deviceXDPI / screen.logicalXDPI;
	}
});
