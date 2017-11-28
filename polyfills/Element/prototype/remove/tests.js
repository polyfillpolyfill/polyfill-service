/* eslint-env mocha, browser */
/* global proclaim */

var element, child;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

beforeEach(function () {
	element = document.createElement('div');
	child = document.createElement('div');

	element.appendChild(child);
});

it('has correct instance', function () {
	proclaim.isInstanceOf(element.remove, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.remove), 'remove');
});

it('has correct argument length', function () {
	proclaim.equal(element.remove.length, 0);
});

it('can remove itself', function () {
	proclaim.equal(child.remove(), undefined);

	proclaim.equal(element.childNodes.length, 0);
});

it('can remove itself from nothing', function () {
	proclaim.equal(child.remove(), undefined);
	proclaim.equal(child.remove(), undefined);

	proclaim.equal(element.childNodes.length, 0);
});
