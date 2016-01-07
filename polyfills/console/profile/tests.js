describe('console', function () {

	it('profile()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.profile();
		}).not.to.throwException();
	});

});
