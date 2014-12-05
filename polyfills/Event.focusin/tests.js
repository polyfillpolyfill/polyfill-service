
it('should dispatch the focusin event', function(done) {
	var testEl = document.createElement('input');
	testEl.id = 'test1';
	document.body.appendChild(testEl);
	window.addEventListener('focusin', listener);
	testEl.focus();

	function listener(e) {
		expect(e.type).to.be('focusin');
		expect(e.target).to.be(testEl);
		window.removeEventListener('focusin', listener);
		document.body.removeChild(testEl);
		done();
	}
});

it('should dispatch the focusout event', function(done) {
	var testEl2 = document.createElement('input');
	testEl2.id = 'test2';
	document.body.appendChild(testEl2);
	testEl2.focus();
	window.addEventListener('focusout', listener);
	testEl2.blur();

	function listener(e) {
		expect(e.type).to.be('focusout');
		expect(e.target).to.be(testEl2);
		document.body.removeChild(testEl2);
		done();
	}
});
