var xhr;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
}

// REMOVED: Safari considers XMLHttpRequest an object
it.skip('has correct instance', function () {
	expect(XMLHttpRequest).to.be.a(Function);
});

// REMOVED: Firefox considers XMLHttpRequest a function, but does not allow you to use Function.prototype.toString (yet accepts XMLHttpRequest.toString!)
it.skip('has correct name', function () {
	expect(nameOf(XMLHttpRequest)).to.be('XMLHttpRequest');
});

// REMOVED: See above
it.skip('has correct argument length', function () {
	expect(XMLHttpRequest.length).to.be(0);
});

it('can create instance', function () {
	xhr = new XMLHttpRequest;
});

it('can setup request', function () {
	expect(xhr.open).to.be.a(Function);
	expect(nameOf(xhr.open)).to.be('open');

	expect(xhr.addEventListener).to.be.a(Function);
	expect(nameOf(xhr.addEventListener)).to.be('addEventListener');

	expect(xhr.send).to.be.a(Function);
	expect(nameOf(xhr.send)).to.be('send');
});

// REMOVED: Inconsistent between browsers, does not affect functionality
it.skip('has methods with correct argument length', function() {
	expect(xhr.open.length).to.be(2);
	expect(xhr.addEventListener.length).to.be(0);
	expect(xhr.send.length).to.be(0);

});

it('can make request', function () {
	xhr.open('GET', location.href);

	xhr.addEventListener('load', function (event) {
		expect(arguments.length).to.be(1);
		expect(event.currentTarget).to.eql(xhr);
	});

	xhr.send();
});
