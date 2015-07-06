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
	expect(element.remove).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.remove)).to.be('remove');
});

it('has correct argument length', function () {
	expect(element.remove.length).to.be(0);
});

it('can remove itself', function () {
	expect(child.remove()).to.be(undefined);

	expect(element.childNodes.length).to.be(0);
});

it('can remove itself from nothing', function () {
	expect(child.remove()).to.be(undefined);
	expect(child.remove()).to.be(undefined);

	expect(element.childNodes.length).to.be(0);
});
