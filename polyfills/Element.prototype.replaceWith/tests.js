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
	expect(element.replaceWith).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.replaceWith)).to.be('replaceWith');
});

it('has correct argument length', function () {
	expect(element.replaceWith.length).to.be(0);
});

it('can replace itself', function () {
	expect(child.replaceWith(child.cloneNode(true))).to.be(undefined);

	expect(element.childNodes.length).to.be(1);
});
