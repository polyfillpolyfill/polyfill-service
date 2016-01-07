describe('console', function () {

	it('count()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.count();
		}).not.to.throwException();
	});

});
