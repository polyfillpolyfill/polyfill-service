/* eslint-env mocha, browser */
/* global proclaim */

it('has a hidden property', function () {
	proclaim.notEqual(typeof document.hidden, 'undefined');
});

it('has a visibilityState property', function () {
	proclaim.notEqual(typeof document.visibilityState, 'undefined');
});

// Because some browsers will have unprefixed native support but will still support the prefixed version, this test will detect a prefix, and fire the event, but the polyfill isn't there so the prefixed version isn't re-fired as the unprefixed one. Therefore this test usefully tests that the polyfill works but can't be used because it will fail in a compliant native implementation. We really need to be able to programmatically trigger a change in page visibility, but I don't believe that's possible.
it.skip('fires a normalized event name', function (done) {
	var prefix = document.mozVisibilityState ? 'moz' : document.webkitVisibilityState ? 'webkit' : null;
	if (!prefix) {
		return done();
	}
	document.addEventListener('visibilitychange', function () {
		proclaim.equal('normalized event fired', 'normalized event fired');
		done();
	});

	document.dispatchEvent(new Event(prefix + 'visibilitychange'));
	done(new Error('Event not fired'));
});
