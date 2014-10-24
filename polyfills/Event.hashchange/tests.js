it('Should dispatch the hashchange event', function(done) {
	window.addEventListener('hashchange', function(e) {
		expect(e.type).to.be('hashchange');
		done();
	});
	window.location.hash = 'test';
});
