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
	proclaim.isInstanceOf(element.append, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.append), 'append');
});

it('has correct argument length', function () {
	proclaim.equal(element.append.length, 0);
});

it('can append elements to itself', function () {
	proclaim.equal(child.append(document.createElement('div')), undefined);
	proclaim.equal(child.append(document.createElement('div'), document.createElement('div')), undefined);
	proclaim.equal(child.append(document.createElement('div'), 'text'), undefined);

	proclaim.equal(child.childNodes.length, 5);
	proclaim.equal(child.lastChild.nodeName, '#text');
});
