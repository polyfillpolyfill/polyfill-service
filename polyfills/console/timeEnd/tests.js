describe('console', function () {

	it('timeEnd()', function () {
		expect(function () {
			console.time('testTimeEnd')
			console.timeEnd('testTimeEnd');
		}).not.to.throwException();
	});

});
