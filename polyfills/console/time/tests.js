describe('console', function () {

	it('time()', function () {
		expect(function () {
			console.time();
		}).not.to.throwException();
	});

});
