/* eslint-env mocha, browser */
/* global proclaim */

var fragment;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

beforeEach(function () {
	fragment = document.createDocumentFragment();
});

it('has correct instance', function () {
	proclaim.isInstanceOf(fragment.append, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(fragment.append), 'append');
});

it('has correct argument length', function () {
	proclaim.equal(fragment.append.length, 0);
});

it('can append elements', function () {
	var child = document.createElement('div');
	fragment.append(child);
	proclaim.equal(fragment.childNodes[0], child);
	proclaim.equal(fragment.childNodes.length, 1);
});
