// Page Visibility API
(function () {
	document.hidden = typeof document.hidden === 'undefined' ? document.webkitHidden : document.hidden;
	document.visibilityState = typeof document.visibilityState === 'undefined' ? document.webkitVisibilityState : document.visibilityState;

	document.addEventListener('webkitvisibilitychange', function (ev) {
		document.hidden = document.webkitHidden;
		document.visibilityState = document.webkitVisibilityState;
		document.dispatchEvent(new CustomEvent('visibilitychange'))
	});
}());
