describe('console', function () {

	it('table()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.table();
		}).not.to.throwException();
	});

});
