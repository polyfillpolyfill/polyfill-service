describe('console', function () {

	it('clear()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.clear();
		}).not.to.throwException();
	});

});
