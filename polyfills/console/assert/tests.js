describe('console', function () {

	it('assert()', function () {
		expect(function () {
			console.assert();
		}).not.to.throwException();
	});

});
