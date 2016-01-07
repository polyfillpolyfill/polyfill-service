describe('console', function () {

	it('show()', function () {
		expect(function () {
			console.show();
		}).not.to.throwException();
	});

});
