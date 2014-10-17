(function (document) {
	var
	element = document.createElement('-'),
	fauxBody = document.createElement('body'),
	nativeBody;

	element.runtimeStyle.cssText = 'clip:rect(0 0 0 0);font-size:1000px;height:0;position:absolute;width:1em;zoom:1';

	function setDevicePixelRatio(rect) {
		nativeBody = nativeBody || document.body;

		rect = (nativeBody || document.documentElement.appendChild(fauxBody)).appendChild(element).getBoundingClientRect();

		window.devicePixelRatio = Math.round((rect.right - rect.left) / element.clientWidth * 1000) / 1000;

		if (nativeBody) {
			element.parentNode.removeChild(element); // body must be referenced as parent for old IE
		} else {
			document.documentElement.removeChild(fauxBody);
		}
	}

	window.attachEvent('onresize', setDevicePixelRatio);

	document.attachEvent('onkeyup', setDevicePixelRatio);

	setDevicePixelRatio();
})(document);
