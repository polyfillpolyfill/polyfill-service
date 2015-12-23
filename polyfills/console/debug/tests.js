describe('console', function () {

	it('debug()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.debug();
		}).not.to.throwException();
	});

});
