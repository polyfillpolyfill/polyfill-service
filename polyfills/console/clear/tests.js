describe('console', function () {

	it('clear()', function () {
		expect(function () {
			console.clear();
		}).not.to.throwException();
	});

});
