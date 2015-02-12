var element, child;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
}

beforeEach(function () {
	element = document.createElement('div');
	child = document.createElement('div');

	element.appendChild(child);
});

it('has correct instance', function () {
	expect(element.prepend).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.prepend)).to.be('prepend');
});

it('has correct argument length', function () {
	expect(element.prepend.length).to.be(0);
});

it('can prepend elements to itself', function () {
	expect(child.prepend(document.createElement('div'))).to.be(undefined);
	expect(child.prepend(document.createElement('div'), document.createElement('div'))).to.be(undefined);
	expect(child.prepend('text', document.createElement('div'))).to.be(undefined);

	expect(child.childNodes.length).to.be(5);
	expect(child.firstChild.nodeName).to.be('#text');
});
