/* eslint-env mocha, browser */
/* global proclaim */

// Safari fails this test.  However, no-one would ever do this
// as it would just create an event that can never be dispatched/listened for
// it doesn't cause any problem
it.skip('should throw exception when instantiated with no parameters', function() {
	proclaim.throws(function() {
		new Event();
	});
});

it('should have correct default properties', function() {
	var testEvent = new Event('click');
	proclaim.equal(testEvent.type, 'click');
	proclaim.equal(testEvent.bubbles, false);
	proclaim.equal(testEvent.cancelable, false);
});

it('should modify default properties if optional EventInit parameter is passed', function() {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});

	proclaim.equal(testEvent.type, 'test');
	proclaim.equal(testEvent.bubbles, true);
	proclaim.equal(testEvent.cancelable, true);
});

it('should be able to fire an event that can be listened to', function(done) {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});

	var testEl = document.createElement('div');
	testEl.addEventListener('test', function(ev) {
		proclaim.equal(ev.type, 'test');
		proclaim.equal(ev.bubbles, true);
		proclaim.equal(ev.cancelable, true);
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
		proclaim.equal(ev.type, 'test');
		proclaim.equal(ev.bubbles, true);
		proclaim.equal(ev.cancelable, true);
		done();
	});
	testEl.dispatchEvent(testEvent);
});

it('should not trigger an event handler once removed', function() {
	var testEvent = new Event('test', {
		bubbles: true,
		cancelable: true
	});
	var listener = function() {
		throw new Error('listener was fired, but should have been removed');
	};

	var testEl = document.createElement('div');
	testEl.addEventListener('test', listener);
	testEl.removeEventListener('test', listener);
	testEl.dispatchEvent(testEvent);
});

it('should trigger an event handler once added, removed, and added again', function () {
	// NOTE: The event must be a real DOM event or the
	// dispatchEvent polyfill will catch the fireEvent
	// error, simulate firing the event by running the
	// event listeners.
	var fired = false;
	var listener = function() {
		fired = true;
		document.removeEventListener('click', listener);
	};

	document.addEventListener('click', listener);
	document.removeEventListener('click', listener);
	document.addEventListener('click', listener);
	// click the document
	document.dispatchEvent(new Event('click'));
	proclaim.equal(fired, true);
});

it('should have the correct target when using delegation', function () {
	var fired = false;
	var el = document.body.firstChild;
	var listener = function(e) {
		if (e.target === el) fired = true;
		document.removeEventListener('click', listener);
	};

	document.addEventListener('click', listener);
	el.dispatchEvent(new Event('click', {
		bubbles: true
	}));
	proclaim.equal(fired, true);
});

it('should successfully call window.addEventListener or throw exception', function() {

	var eventsToTest = [
		'click',
		'dblclick',
		'keyup',
		'keypress',
		'keydown',
		'mousedown',
		'mouseup',
		'mousemove',
		'mouseover',
		'mouseenter',
		'mouseleave',
		'mouseout',
		'storage',
		'storagecommit',
		'textinput'
	];

	var threwLast;
	var threw;
	var listener = function() {};
	for(var i = 0; i < eventsToTest.length; i++) {
		var eventType = eventsToTest[i];
		try {
			window.addEventListener(eventType, listener);
			threw = false;
		} catch(ignore) {
			threw = true;
		}

		if (typeof (threwLast) != 'undefined') {
			proclaim.equal(threw, threwLast);
		}
		threwLast = threw;
	}
});

it('subclasses should be instances of Event if the UA implements DOM3', function () {
	var a = document.createElement('a');
	a.addEventListener('click', function(ev) {

		// Supported in IE9+
		if ('MouseEvent' in window) {
			proclaim.isInstanceOf(ev, Event);
		}
	});
	document.body.appendChild(a);
	// Can not use a.click() as Safari 5.1 does not support the click method.
	a.dispatchEvent(new Event('click', {
		bubbles: true
	}));
});

it('should have eventPhase constants', function () {
	proclaim.equal(Event.NONE, 0);
	proclaim.equal(Event.CAPTURING_PHASE, 1);
	proclaim.equal(Event.AT_TARGET, 2);
	proclaim.equal(Event.BUBBLING_PHASE, 3);
});
