(function () {
	var
	document = window.document,
	documentElement = document.documentElement;

	function onResize() {
		var body = document.body || document.createElement('body');

		// <Window>.pageXOffset
		window.scrollX = window.pageXOffset = Math.max((documentElement.scrollLeft || body.scrollLeft || 0) - (documentElement.clientLeft || body.clientLeft || 0), 0);

		// <Window>.pageYOffset
		window.scrollY = window.pageYOffset = Math.max((documentElement.scrollTop || body.scrollTop || 0) - (documentElement.clientTop || body.clientTop || 0), 0);

		// <Window>.innerWidth
		window.innerWidth = documentElement.clientWidth;

		// <Window>.innerHeight
		window.innerHeight = documentElement.clientHeight;
	}

	window.attachEvent('onresize', onResize);
	window.attachEvent('onscroll', onResize);

	onResize();
})();
