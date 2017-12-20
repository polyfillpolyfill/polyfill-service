/* eslint-env mocha, browser */
/* global proclaim */

/* The detect and tests for the focusin/focusout polyfill have been shown to not work reliably. See https://github.com/Financial-Times/polyfill-service/issues/213 for details.  The polyfill itself appears to work fine, but events progrmamatically fired during page load while dev tools is open appear not to be observable by the polyfill, which makes the test and detect unreliable.  We're continuing to serve the polyfill as it's pretty simple but would love to get some better insight into this problem. */

it.skip('should dispatch the focusin event', function(done) {
	var testEl = document.createElement('input');
	testEl.id = 'test1';
	document.body.appendChild(testEl);
	window.addEventListener('focusin', listener);
	testEl.focus();

	function listener(e) {
		proclaim.equal(e.type, 'focusin');
		proclaim.equal(e.target, testEl);
		window.removeEventListener('focusin', listener);
		document.body.removeChild(testEl);
		done();
	}
});

it.skip('should dispatch the focusout event', function(done) {
	var testEl2 = document.createElement('input');
	testEl2.id = 'test2';
	document.body.appendChild(testEl2);
	testEl2.focus();
	window.addEventListener('focusout', listener);
	testEl2.blur();

	function listener(e) {
		proclaim.equal(e.type, 'focusout');
		proclaim.equal(e.target, testEl2);
		document.body.removeChild(testEl2);
		done();
	}
});
