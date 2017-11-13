/* eslint-env mocha, browser */
/* global proclaim */

// in doubt, see https://github.com/WebReflection/dom4/blob/master/test/dom4.js tests

it('should be trigger just once with once option', function() {
    var testEvent = new Event('test', {
        bubbles: true,
        cancelable: true
    });
    var testEl = document.createElement('div');
    var counter = 0;
    var increment = function() {
        counter++;
    };

    testEl.addEventListener('test', increment, {once: true});
    testEl.dispatchEvent(testEvent);
    testEl.dispatchEvent(testEvent);
    proclaim.equal(counter, 1);
});

it('should be trigger as many as called when no once option', function() {
    var testEvent = new Event('test', {
        bubbles: true,
        cancelable: true
    });
    var testEl = document.createElement('div');
    var counter = 0;
    var increment = function() {
        counter++;
    };

    testEl.addEventListener('test', increment);
    testEl.dispatchEvent(testEvent);
    testEl.dispatchEvent(testEvent);
    testEl.removeEventListener('test', increment);
    proclaim.equal(counter, 2);
});

it('should have no prevent default with passive option', function() {
    var testEvent = new Event('test', {
        bubbles: true,
        cancelable: true
    });
    var testEl = document.createElement('div');
    var defaultPrevented;
    var callback = function(ev) {
        ev.preventDefault();
        defaultPrevented = ev.defaultPrevented;
    };

    testEl.addEventListener('test', callback, {passive: true});
    testEl.dispatchEvent(testEvent);
    testEl.removeEventListener('test', callback, {passive: true});
    proclaim.equal(defaultPrevented, false);
});

it('should have prevent default when no passive option', function() {
    var testEvent = new Event('test', {
        bubbles: true,
        cancelable: true
    });
    var testEl = document.createElement('div');
    var defaultPrevented;
    var callback = function(ev) {
        ev.preventDefault();
        defaultPrevented = ev.defaultPrevented;
    };

    testEl.addEventListener('test', callback);
    testEl.dispatchEvent(testEvent);
    testEl.removeEventListener('test', callback);
    proclaim.equal(defaultPrevented, true);
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
