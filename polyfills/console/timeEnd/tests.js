describe('console', function () {

	it('timeEnd()', function () {
		expect(function () {
			console.timeEnd();
		}).not.to.throwException();
	});

});
