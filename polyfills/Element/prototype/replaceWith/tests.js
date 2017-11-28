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
	proclaim.isInstanceOf(element.replaceWith, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.replaceWith), 'replaceWith');
});

it('has correct argument length', function () {
	proclaim.equal(element.replaceWith.length, 0);
});

it('can replace itself', function () {
	proclaim.equal(child.replaceWith(child.cloneNode(true)), undefined);

	proclaim.equal(element.childNodes.length, 1);
});
