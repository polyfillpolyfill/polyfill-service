(function (window) {
	var devicePixelRatio = window.devicePixelRatio;

	window.devicePixelRatio = devicePixelRatio * (window.outerWidth / window.screen.width);

	window.addEventListener('scroll', function () {
		window.devicePixelRatio = devicePixelRatio * (window.outerWidth / window.screen.width);
	});
})(this);
