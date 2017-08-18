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
	proclaim.isInstanceOf(element.before, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.before), 'before');
});

it('has correct argument length', function () {
	proclaim.equal(element.before.length, 0);
});

it('can insert elements before itself', function () {
	proclaim.equal(child.before('text', document.createElement('div')), undefined);
	proclaim.equal(child.before(document.createElement('div')), undefined);
	proclaim.equal(child.before(document.createElement('div'), document.createElement('div')), undefined);

	proclaim.equal(element.childNodes.length, 6);
	proclaim.equal(element.firstChild.nodeName, '#text');
});
