describe('console', function () {

	it('dir()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.dir();
		}).not.to.throwException();
	});

});
