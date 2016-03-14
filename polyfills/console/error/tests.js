describe('console', function () {

	it('error()', function () {
		expect(function () {
			console.error();
		}).not.to.throwException();
	});

});
