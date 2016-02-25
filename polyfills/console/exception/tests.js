describe('console', function () {

	it('exception()', function () {
		expect(function () {
			console.exception();
		}).not.to.throwException();
	});

});
