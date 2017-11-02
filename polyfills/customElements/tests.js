/* eslint-env mocha, browser */
/* global proclaim */

describe('customElements', function() {
	var XFoo;

	before(function() {
		XFoo = function XFoo() {
			return HTMLElement.apply(this, arguments);
		};

		XFoo.__proto__ = HTMLElement;
		XFoo.prototype = Object.create(HTMLElement.prototype);
		XFoo.prototype.constructor = XFoo;

		customElements.define('x-foo', XFoo);
	});

	it('can define a new custom element', function() {
		var el = document.createElement('x-foo');
		proclaim.isInstanceOf(el, HTMLElement);
		proclaim.isInstanceOf(el, XFoo);
	});
	
	it('can insert a custom element into the DOM', function() {
		var p = document.createElement('p');
		var xFooInstance;

		p.innerHTML = '<x-foo></x-foo>';

		xFooInstance = p.querySelector('x-foo');
		proclaim.isInstanceOf(xFooInstance, XFoo);
	});

	it('can create a custom element from constructor', function() {
		var xFooInstance = new XFoo();
		proclaim.isInstanceOf(xFooInstance, HTMLElement);
		proclaim.isInstanceOf(xFooInstance, XFoo);
	});
	
});
