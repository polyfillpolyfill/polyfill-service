it('should return an array for a NodeList', function() {
	Array.from(document.querySelectorAll('*')).should.be.an.instanceOf(Array);
});
it('should tokenise a string', function() {
	Array.from('foo').should.eql(['f','o','o']);
});
it('should accept a callback', function(done) {
	Array.from(document.querySelectorAll('html'), function() {
		done();
	});
});
