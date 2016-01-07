describe('console', function () {

	it('dir()', function () {
		expect(function () {
			console.dir();
		}).not.to.throwException();
	});

});
