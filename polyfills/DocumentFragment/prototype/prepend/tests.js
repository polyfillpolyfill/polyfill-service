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
        proclaim.isInstanceOf(fragment.prepend, Function);
});

it('has correct name', function () {
        proclaim.equal(nameOf(fragment.prepend), 'prepend');
});

it('has correct argument length', function () {
        proclaim.equal(fragment.prepend.length, 0);
});

it('can prepend elements to itself', function () {
        proclaim.equal(fragment.prepend(document.createElement('div')), undefined);
        proclaim.equal(fragment.prepend(document.createElement('div'), document.createElement('div')), undefined);
        proclaim.equal(fragment.prepend('text', document.createElement('div')), undefined);

        proclaim.equal(fragment.childNodes.length, 5);
        proclaim.equal(fragment.firstChild.nodeName, '#text');
});

