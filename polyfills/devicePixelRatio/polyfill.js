(function (global) {
	var element = document.createElement('x-zoom');

	element.style.cssText = 'clip:rect(0 0 0 0);display:block;font-size:1000px;position:absolute;-webkit-text-size-adjust:none;width:1em';

	function updateDevicePixelRatio() {
		document.documentElement.appendChild(element);

		// <Global>.devicePixelRatio
		global.devicePixelRatio = Math.round(100000 / element.clientWidth) / 100;

		document.documentElement.removeChild(element);
	}

	global.addEventListener('resize', updateDevicePixelRatio);

	updateDevicePixelRatio();
})(this);
