describe('console', function () {

	it('info()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.info();
		}).not.to.throwException();
	});

});
