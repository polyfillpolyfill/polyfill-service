describe('console', function () {

	it('profiles()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.profiles();
		}).not.to.throwException();
	});

});
