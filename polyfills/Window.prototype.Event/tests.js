it('should throw exception when instantiated with no parameters', function() {
	expect(function() {
		new Event()
	}).to.throwException();
});

it('should have correct default properties', function() {
	var testEvent = new Event('click');
	expect(testEvent.type).to.be('click');
	expect(testEvent.bubbles).to.be(false);
	expect(testEvent.cancelable).to.be(false);
});

it('should modify default properties if optional EventInit parameter is passed', function() {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});

	expect(testEvent.type).to.be('test');
	expect(testEvent.bubbles).to.be(true);
	expect(testEvent.cancelable).to.be(true);
});

it('should be able to fire an event that can be listened to', function(done) {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});

	var testEl = document.createElement('div');
	testEl.addEventListener('test', function(ev) {
		expect(ev.type).to.be('test');
		expect(ev.bubbles).to.be(true);
		expect(ev.cancelable).to.be(true);
		done();
	});
	testEl.dispatchEvent(testEvent);
});

it('should bubble the event', function(done) {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});

	var testEl = document.createElement('div');
	document.body.appendChild(testEl);
	document.body.addEventListener('test', function(ev) {
		expect(ev.type).to.be('test');
		expect(ev.bubbles).to.be(true);
		expect(ev.cancelable).to.be(true);
		done();
	});
	testEl.dispatchEvent(testEvent);
});
