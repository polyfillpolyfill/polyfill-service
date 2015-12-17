// Page Visibility API
(function () {
	var prefix = document.webkitVisibilityState ? 'webkit' : document.mozVisibilityState ? 'moz' : null;

	if (!prefix) {
		return;
	}

	document.visibilityState = document[prefix + 'VisibilityState'];
	document.hidden = document[prefix + 'Hidden'];

	document.addEventListener(prefix + 'visibilitychange', function (ev) {
		document.hidden = document[prefix + 'Hidden'];
		document.visibilityState = document[prefix + 'VisibilityState'];
		document.dispatchEvent(new CustomEvent('visibilitychange'))
	});
}());
