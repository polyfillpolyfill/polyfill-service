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
	expect(element.after).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.after)).to.be('after');
});

it('has correct argument length', function () {
	expect(element.after.length).to.be(0);
});

it('can insert elements after itself', function () {
	expect(child.after(document.createElement('div'), 'text')).to.be(undefined);
	expect(child.after(document.createElement('div'))).to.be(undefined);
	expect(child.after(document.createElement('div'), document.createElement('div'))).to.be(undefined);

	expect(element.childNodes.length).to.be(6);
	expect(element.lastChild.nodeName).to.be('#text');
});
