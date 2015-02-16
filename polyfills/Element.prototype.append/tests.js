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
	expect(element.append).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.append)).to.be('append');
});

it('has correct argument length', function () {
	expect(element.append.length).to.be(0);
});

it('can append elements to itself', function () {
	expect(child.append(document.createElement('div'))).to.be(undefined);
	expect(child.append(document.createElement('div'), document.createElement('div'))).to.be(undefined);
	expect(child.append(document.createElement('div'), 'text')).to.be(undefined);

	expect(child.childNodes.length).to.be(5);
	expect(child.lastChild.nodeName).to.be('#text');
});
