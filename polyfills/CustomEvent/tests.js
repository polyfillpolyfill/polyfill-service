/* Not supported by the polyfill
it('should have an initCustomEvent function', function() {
	expect(typeof CustomEvent.prototype.initCustomEvent).to.be('function');
});
*/

it('should throw exception when instantiated with no parameters', function() {
	expect(function() {
		new CustomEvent()
	}).to.throwException();
});

it('should have correct default properties', function() {
	var testEvent = new CustomEvent('test');
	expect(testEvent.type).to.be('test');
	expect(testEvent.bubbles).to.be(false);
	expect(testEvent.cancelable).to.be(false);
	expect(testEvent.detail).to.be(null);
});

it('should modify default properties if optional CustomEventInit parameter is passed', function() {
	var testEvent = new CustomEvent('test', {
		bubbles: true,
		cancelable: true,
		detail: 'test detail'
	});

	expect(testEvent.type).to.be('test');
	expect(testEvent.bubbles).to.be(true);
	expect(testEvent.cancelable).to.be(true);
	expect(testEvent.detail).to.be('test detail');
});

it('should be able to fire an event that can be listened to', function() {
	var testEvent = new CustomEvent('test', {
		bubbles: true,
		cancelable: true,
		detail: 'test detail'
	});

	var testEl = document.createElement('div');
	testEl.addEventListener('test', function(ev) {
		expect(ev.detail).to.be('test detail');
		expect(ev.type).to.be('test');
		expect(ev.bubbles).to.be(true);
		expect(ev.cancelable).to.be(true);
	});
	testEl.dispatchEvent(testEvent);
});
