describe('console', function () {

	it('info()', function () {
		expect(function () {
			console.info();
		}).not.to.throwException();
	});

});
