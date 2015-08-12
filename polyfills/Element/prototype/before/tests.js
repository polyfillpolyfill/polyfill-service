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
	expect(element.before).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.before)).to.be('before');
});

it('has correct argument length', function () {
	expect(element.before.length).to.be(0);
});

it('can insert elements before itself', function () {
	expect(child.before('text', document.createElement('div'))).to.be(undefined);
	expect(child.before(document.createElement('div'))).to.be(undefined);
	expect(child.before(document.createElement('div'), document.createElement('div'))).to.be(undefined);

	expect(element.childNodes.length).to.be(6);
	expect(element.firstChild.nodeName).to.be('#text');
});
