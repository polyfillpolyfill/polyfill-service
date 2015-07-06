it('should be defined', function() {
	expect(window.location.origin).to.not.be(undefined);
});

it('should include the protocol', function() {
	var proto = window.location.protocol;
	expect(window.location.origin.substr(0,proto.length)).to.equal(proto);
});

it('should include the hostname', function() {
	expect(window.location.origin).to.contain(window.location.hostname);
});

it('should include the port', function() {
	expect(window.location.origin).to.contain(window.location.port);
});
