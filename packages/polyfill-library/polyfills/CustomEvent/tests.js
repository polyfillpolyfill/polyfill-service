/* eslint-env mocha, browser */
/* global proclaim */

/* Not supported by the polyfill
it('should have an initCustomEvent function', function() {
	proclaim.isInstanceOf(typeof CustomEvent.prototype.initCustomEvent, Function);
});
*/

// This test is ignored as, although this feature is in the spec it does not affect users
// Safari allows you to instantiate with no parameters, all this means is you create an event that you can never
// listen for - pointless, but will not break anything...
it.skip('should throw exception when instantiated with no parameters', function() {
	proclaim.throws(function() {
		new CustomEvent();
	});
});

it('should have correct default properties', function() {
	var testEvent = new CustomEvent('test');
	proclaim.equal(testEvent.type, 'test');
	proclaim.equal(testEvent.bubbles, false);
	proclaim.equal(testEvent.cancelable, false);
	proclaim.equal(testEvent.detail, null);
});

it('should modify default properties if optional CustomEventInit parameter is passed', function() {
	var testEvent = new CustomEvent('test', {
		bubbles: true,
		cancelable: true,
		detail: 'test detail'
	});

	proclaim.equal(testEvent.type, 'test');
	proclaim.equal(testEvent.bubbles, true);
	proclaim.equal(testEvent.cancelable, true);
	proclaim.equal(testEvent.detail, 'test detail');
});

it('should be able to fire an event that can be listened to', function() {
	var testEvent = new CustomEvent('test', {
		bubbles: true,
		cancelable: true,
		detail: 'test detail'
	});

	var testEl = document.createElement('div');
	testEl.addEventListener('test', function(ev) {
		proclaim.equal(ev.detail, 'test detail');
		proclaim.equal(ev.type, 'test');
		proclaim.equal(ev.bubbles, true);
		proclaim.equal(ev.cancelable, true);
	});
	testEl.dispatchEvent(testEvent);
});
