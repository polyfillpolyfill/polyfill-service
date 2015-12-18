it('has a hidden property', function () {
	expect(typeof document.hidden).not.to.equal('undefined')
});

it('has a visibilityState property', function () {
	expect(typeof document.visibilityState).not.to.equal('undefined')
});

it('fires a normalized event name', function (done) {
	var prefix = document.mozVisibilityState ? 'moz' : document.webkitVisibilityState ? 'webkit' : null;
	if (!prefix) {
		return done();
	}
	document.addEventListener('visibilitychange', function (ev) {
		expect('normalized event fired').to.equal('normalized event fired');
		done();
	});

	document.dispatchEvent(new Event(prefix + 'visibilitychange'));
});
