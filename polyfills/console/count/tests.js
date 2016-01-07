describe('console', function () {

	it('count()', function () {
		expect(function () {
			console.count();
		}).not.to.throwException();
	});

});
