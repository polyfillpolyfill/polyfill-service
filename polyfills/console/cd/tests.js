describe('console', function () {

	it('cd()', function () {
		expect(function () {
			console.cd();
		}).not.to.throwException();
	});

});
