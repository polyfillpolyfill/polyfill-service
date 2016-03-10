describe('console', function () {

	it('trace()', function () {
		expect(console.memory).to.be.ok;
		expect(function () {
			console.trace();
		}).not.to.throwException();
	});

});
