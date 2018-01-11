/* eslint-env mocha, browser */
/* global proclaim */

it('Should dispatch the hashchange event', function(done) {

	var listener = function(e) {
		proclaim.equal(e.type, 'hashchange');
		window.removeEventListener('hashchange', listener);
		done();
	};

	window.addEventListener('hashchange', listener);

	window.location.hash = 'hashchange-test-'+Math.floor(Math.random()*1000000);
});
