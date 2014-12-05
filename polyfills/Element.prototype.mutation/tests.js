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
	expect(element.prepend).to.be.a(Function);
	expect(element.before).to.be.a(Function);
	expect(element.after).to.be.a(Function);
	expect(element.remove).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(element.append)).to.be('append');
	expect(nameOf(element.prepend)).to.be('prepend');
	expect(nameOf(element.before)).to.be('before');
	expect(nameOf(element.after)).to.be('after');
	expect(nameOf(element.remove)).to.be('remove');
});

it('has correct argument length', function () {
	expect(element.append.length).to.be(0);
	expect(element.prepend.length).to.be(0);
	expect(element.before.length).to.be(0);
	expect(element.after.length).to.be(0);
	expect(element.remove.length).to.be(0);
});

it('can append elements to itself', function () {
	expect(child.append(document.createElement('div'))).to.be(undefined);
	expect(child.append(document.createElement('div'), document.createElement('div'))).to.be(undefined);
	expect(child.append(document.createElement('div'), 'text')).to.be(undefined);

	expect(child.childNodes.length).to.be(5);
	expect(child.lastChild.nodeName).to.be('#text');
});

it('can prepend elements to itself', function () {
	expect(child.prepend(document.createElement('div'))).to.be(undefined);
	expect(child.prepend(document.createElement('div'), document.createElement('div'))).to.be(undefined);
	expect(child.prepend('text', document.createElement('div'))).to.be(undefined);

	expect(child.childNodes.length).to.be(5);
	expect(child.firstChild.nodeName).to.be('#text');
});

it('can insert elements before itself', function () {
	expect(child.before('text', document.createElement('div'))).to.be(undefined);
	expect(child.before(document.createElement('div'))).to.be(undefined);
	expect(child.before(document.createElement('div'), document.createElement('div'))).to.be(undefined);

	expect(element.childNodes.length).to.be(6);
	expect(element.firstChild.nodeName).to.be('#text');
});

it('can insert elements after itself', function () {
	expect(child.after(document.createElement('div'), 'text')).to.be(undefined);
	expect(child.after(document.createElement('div'))).to.be(undefined);
	expect(child.after(document.createElement('div'), document.createElement('div'))).to.be(undefined);

	expect(element.childNodes.length).to.be(6);
	expect(element.lastChild.nodeName).to.be('#text');
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
