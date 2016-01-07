describe('console', function () {

	it('timeStamp()', function () {
		expect(function () {
			console.timeStamp();
		}).not.to.throwException();
	});

});
