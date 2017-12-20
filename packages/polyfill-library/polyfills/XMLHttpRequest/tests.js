/* eslint-env mocha, browser */
/* global proclaim */

var xhr;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

// REMOVED: Safari considers XMLHttpRequest an object
it.skip('has correct instance', function () {
	proclaim.isInstanceOf(XMLHttpRequest, Function);
});

// REMOVED: Firefox considers XMLHttpRequest a function, but does not allow you to use Function.prototype.toString (yet accepts XMLHttpRequest.toString!)
it.skip('has correct name', function () {
	proclaim.equal(nameOf(XMLHttpRequest), 'XMLHttpRequest');
});

// REMOVED: See above
it.skip('has correct argument length', function () {
	proclaim.equal(XMLHttpRequest.length, 0);
});

it('has correct states', function () {
	proclaim.equal(XMLHttpRequest.UNSENT, 0);
	proclaim.equal(XMLHttpRequest.OPENED, 1);
	proclaim.equal(XMLHttpRequest.HEADERS_RECEIVED, 2);
	proclaim.equal(XMLHttpRequest.LOADING, 3);
	proclaim.equal(XMLHttpRequest.DONE, 4);
});

it('can create instance', function () {
	xhr = new XMLHttpRequest;
});

it('can setup request', function () {
	proclaim.isInstanceOf(xhr.open, Function);
	proclaim.equal(nameOf(xhr.open), 'open');

	proclaim.isInstanceOf(xhr.addEventListener, Function);
	proclaim.equal(nameOf(xhr.addEventListener), 'addEventListener');

	proclaim.isInstanceOf(xhr.send, Function);
	proclaim.equal(nameOf(xhr.send), 'send');
});

// REMOVED: Inconsistent between browsers, does not affect functionality
it.skip('has methods with correct argument length', function() {
	proclaim.equal(xhr.open.length, 2);
	proclaim.equal(xhr.addEventListener.length, 0);
	proclaim.equal(xhr.send.length, 0);

});

it('can make request', function () {
	xhr.open('GET', location.href);

	xhr.addEventListener('load', function (event) {
		proclaim.equal(arguments.length, 1);
		proclaim.deepEqual(event.currentTarget, xhr);
	});

	xhr.send();
});
