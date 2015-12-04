// Page Visibility API
(function () {
	document.hidden = typeof document.hidden === 'undefined' ? document.mozHidden : document.hidden;
	document.visibilityState = typeof document.visibilityState === 'undefined' ? document.mozVisibilityState : document.visibilityState;

	document.addEventListener('mozvisibilitychange', function (ev) {
		document.hidden = document.mozHidden;
		document.visibilityState = document.mozVisibilityState;
		document.dispatchEvent(new CustomEvent('visibilitychange'))
	});

}());
