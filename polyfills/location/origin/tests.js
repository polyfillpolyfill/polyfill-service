/* eslint-env mocha, browser */
/* global proclaim */

it('should be defined', function() {
	proclaim.notEqual(window.location.origin, undefined);
});

it('should include the protocol', function() {
	var proto = window.location.protocol;
	proclaim.equal(window.location.origin.substr(0,proto.length), proto);
});

it('should include the hostname', function() {
	proclaim.include(window.location.origin, window.location.hostname);
});

it('should include the port', function() {
	proclaim.include(window.location.origin, window.location.port);
});
