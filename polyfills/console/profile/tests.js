describe('console', function () {

	it('profile()', function () {
		expect(function () {
			console.profile();
		}).not.to.throwException();
	});

});
