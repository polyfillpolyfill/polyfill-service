describe('console', function () {

	it('log()', function () {
		expect(function () {
			console.log();
		}).not.to.throwException();
	});

});
