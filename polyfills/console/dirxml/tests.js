describe('console', function () {

	it('dirxml()', function () {
		expect(function () {
			console.dirxml(document.body); // argument requied for IE11
		}).not.to.throwException();
	});

});
