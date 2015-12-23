describe('console', function () {

	it('dirxml()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.dirxml(document.body); // argument requied for IE11
		}).not.to.throwException();
	});

});
