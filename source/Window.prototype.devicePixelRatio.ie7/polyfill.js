// Window.prototype.devicePixelRatio
(function () {
	var element = document.createElement('x-zoom');
	element.style.cssText = 'clip:rect(0 0 0 0);display:block;font-size:1000px;position:absolute;width:1em';

	function updateDevicePixelRatio() {
		var
		hasBody = document.body,
		body = hasBody || document.documentElement.appendChild(document.createElement('body'));

		body.appendChild(element);

		var rect = element.getBoundingClientRect();

		window.devicePixelRatio = Math.round((rect.right - rect.left) / element.clientWidth * 1000) / 1000;

		element.parentNode.removeChild(element)

		if (!hasBody) {
			document.documentElement.removeChild(body);
		}
	}

	window.attachEvent('onresize', updateDevicePixelRatio);

	document.attachEvent('onkeyup', updateDevicePixelRatio);

	updateDevicePixelRatio();
})();
