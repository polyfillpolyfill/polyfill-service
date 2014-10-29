it('has correct instance', function () {
	expect(XMLHttpRequest).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(XMLHttpRequest)).to.be('XMLHttpRequest');
});

it('has correct argument length', function () {
	expect(XMLHttpRequest.length).to.be(0);
});

it('can make request', function () {
	var xhr = new XMLHttpRequest;

	expect(xhr.open).to.be.a(Function);

	expect(nameOf(xhr.open)).to.be('open');
	expect(xhr.open.length).to.be(2);

	expect(xhr.addEventListener).to.be.a(Function);
	expect(nameOf(xhr.addEventListener)).to.be('addEventListener');
	expect(xhr.addEventListener.length).to.be(0);

	expect(xhr.send).to.be.a(Function);
	expect(nameOf(xhr.send)).to.be('send');
	expect(xhr.send.length).to.be(0);

	xhr.open('GET', location.href);

	xhr.addEventListener('load', function (event) {
		expect(event.currentTarget).to.eql(xhr);
	});

	xhr.send();
});
