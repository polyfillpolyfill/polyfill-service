it('Should dispatch the hashchange event', function(done) {

	var listener = function(e) {
		expect(e.type).to.be('hashchange');
		window.removeEventListener('hashchange', listener);
		done();
	}

	window.addEventListener('hashchange', listener);

	window.location.hash = 'hashchange-test-'+Math.floor(Math.random()*1000000);
});
