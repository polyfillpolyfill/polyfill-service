var xhr;

// Safari 5.1+ does not consider XMLHttpRequest a function
if (XMLHttpRequest instanceof Function) {
	it('has correct instance', function () {
		expect(XMLHttpRequest).to.be.a(Function);
	});

	it('has correct name', function () {
		expect(nameOf(XMLHttpRequest)).to.be('XMLHttpRequest');
	});

	it('has correct argument length', function () {
		expect(XMLHttpRequest.length).to.be(0);
	});
}

it('can create instance', function () {
	xhr = new XMLHttpRequest;
});

it('can setup request', function () {
	expect(xhr.open).to.be.a(Function);
	expect(nameOf(xhr.open)).to.be('open');
	// expect(xhr.open.length).to.be(2);

	expect(xhr.addEventListener).to.be.a(Function);
	expect(nameOf(xhr.addEventListener)).to.be('addEventListener');
	// expect(xhr.addEventListener.length).to.be(0);

	expect(xhr.send).to.be.a(Function);
	expect(nameOf(xhr.send)).to.be('send');
	// expect(xhr.send.length).to.be(0);
});

it('can make request', function () {
	xhr.open('GET', location.href);

	xhr.addEventListener('load', function (event) {
		expect(arguments.length).to.be(1);
		expect(event.currentTarget).to.eql(xhr);
	});

	xhr.send();
});
