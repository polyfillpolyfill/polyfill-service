describe('console', function () {

	it('error()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.error();
		}).not.to.throwException();
	});

});
