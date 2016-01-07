describe('console', function () {

	it('profileEnd()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.profileEnd();
		}).not.to.throwException();
	});

});
