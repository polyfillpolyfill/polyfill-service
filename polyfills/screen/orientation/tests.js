it('returns an object', function () {
	expect(window.screen.orientation).to.be.an('object');
});

it('has type property', function () {
	var valid = {'landscape-primary': 1, 'landscape-secondary':1, 'portrait-primary':1, 'portrait-secondary':1};
	expect(window.screen.orientation.type && valid[window.screen.orientation.type]).to.eql(true);
});

it('has angle property', function () {
	expect(window.screen.orientation.angle).to.be.a('number');
});
