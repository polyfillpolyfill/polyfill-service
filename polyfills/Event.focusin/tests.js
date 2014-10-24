it('Should dispatch the focusin event', function(done) {
	var testEl = document.createElement('div');
	window.addEventListener('focusin', function(e) {
		expect(e.type).to.be('focusin');
		expect(e.target).to.be(testEl);
		done();
	});
	document.body.appendChild(testEl);
	testEl.dispatchEvent(new Event('focus'));
});

it('Should dispatch the focusout event', function(done) {
	var testEl = document.createElement('div');
	window.addEventListener('focusout', function(e) {
		expect(e.type).to.be('focusout');
		expect(e.target).to.be(testEl);
		done();
	});
	document.body.appendChild(testEl);
	testEl.dispatchEvent(new Event('blur'));
});
