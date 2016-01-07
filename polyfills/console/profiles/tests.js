describe('console', function () {

	it('profiles()', function () {
		expect(function () {
			console.profiles();
		}).not.to.throwException();
	});

});
