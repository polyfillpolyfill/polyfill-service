it('Should dispatch the hashchange event', function(done) {
	window.location.hash = '';

	window.addEventListener('hashchange', function(e) {
		expect(e.type).to.be('hashchange');
		done();
	});

	window.location.hash = 'test';
});
