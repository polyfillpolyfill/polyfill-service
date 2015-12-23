describe('console', function () {

	it('show()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.show();
		}).not.to.throwException();
	});

});
