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
	proclaim.isInstanceOf(element.after, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.after), 'after');
});

it('has correct argument length', function () {
	proclaim.equal(element.after.length, 0);
});

it('can insert elements after itself', function () {
	proclaim.equal(child.after(document.createElement('div'), 'text'), undefined);
	proclaim.equal(child.after(document.createElement('div')), undefined);
	proclaim.equal(child.after(document.createElement('div'), document.createElement('div')), undefined);

	proclaim.equal(element.childNodes.length, 6);
	proclaim.equal(element.lastChild.nodeName, '#text');
});
