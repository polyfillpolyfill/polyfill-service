describe('console', function () {

	it('table()', function () {
		expect(function () {
			console.table();
		}).not.to.throwException();
	});

});
