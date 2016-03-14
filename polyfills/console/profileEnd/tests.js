describe('console', function () {

	it('profileEnd()', function () {
		expect(function () {
			console.profileEnd();
		}).not.to.throwException();
	});

});
