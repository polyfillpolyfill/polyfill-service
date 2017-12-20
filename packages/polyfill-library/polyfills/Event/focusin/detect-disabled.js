/* The detect and tests for the focusin/focusout polyfill have been shown to not work reliably. See https://github.com/Financial-Times/polyfill-service/issues/213 for details.  The polyfill itself appears to work fine, but events progrmamatically fired during page load while dev tools is open appear not to be observable by the polyfill, which makes the test and detect unreliable.  We're continuing to serve the polyfill as it's pretty simple but would love to get some better insight into this problem. */

(function(support, html, a) {
	function onfocusin() {
		support = true;
	}

	a.href = '#';

	if ('addEventListener' in a) {
		a.addEventListener('focusin', onfocusin);
	} else {
		a.attachEvent('onfocusin', onfocusin);
	}

	html.appendChild(a).focus();

	html.removeChild(a);

	return support;
}(false, document.documentElement, document.createElement('a')));
