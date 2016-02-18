describe('console', function () {

	it('time()', function () {
		expect(function () {
			console.time('testTime');
		}).not.to.throwException();
	});

});
