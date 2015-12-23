describe('console', function () {

	it('exception()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.exception();
		}).not.to.throwException();
	});

});
