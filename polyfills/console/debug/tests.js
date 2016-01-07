describe('console', function () {

	it('debug()', function () {
		expect(function () {
			console.debug();
		}).not.to.throwException();
	});

});
