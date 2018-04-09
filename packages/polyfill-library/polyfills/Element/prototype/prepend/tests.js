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
	proclaim.isInstanceOf(element.prepend, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.prepend), 'prepend');
});

it('has correct argument length', function () {
	proclaim.equal(element.prepend.length, 0);
});

it('can prepend elements to itself', function () {
	proclaim.equal(child.prepend(document.createElement('div')), undefined);
	proclaim.equal(child.prepend(document.createElement('div'), document.createElement('div')), undefined);
	proclaim.equal(child.prepend('text', document.createElement('div')), undefined);

	proclaim.equal(child.childNodes.length, 5);
	proclaim.equal(child.firstChild.nodeName, '#text');
});
