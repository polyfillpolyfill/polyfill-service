/* eslint-env mocha, browser */
/* global proclaim */

// Tests borrowed from the shim's own tests
// https://github.com/webcomponents/custom-elements/blob/master/tests/html/shim.html
describe('creating a webcomponent with an ES5 class', function() {
	it('works with createElement()', function() {
		function ES5Element1() {
			return HTMLElement.apply(this);
		}
		ES5Element1.prototype = Object.create(HTMLElement.prototype);
		ES5Element1.prototype.constructor = ES5Element1;
		customElements.define('es5-element-1', ES5Element1);
		const el = document.createElement('es5-element-1');
		proclaim.isInstanceOf(el, ES5Element1);
		proclaim.isInstanceOf(el, HTMLElement);
		proclaim.equal(el.tagName, 'ES5-ELEMENT-1');
	});

	it('works with user-called constructors', function() {
		function ES5Element2() {
			return HTMLElement.apply(this);
		}
		ES5Element2.prototype = Object.create(HTMLElement.prototype);
		ES5Element2.prototype.constructor = ES5Element2;
		customElements.define('es5-element-2', ES5Element2);
		const el = new ES5Element2();
		proclaim.isInstanceOf(el, ES5Element2);
		proclaim.isInstanceOf(el, HTMLElement);
		proclaim.equal(el.tagName, 'ES5-ELEMENT-2');
	});

	it('works with parser created elements', function() {
		function ES5Element3() {
			return HTMLElement.apply(this);
		}
		ES5Element3.prototype = Object.create(HTMLElement.prototype);
		ES5Element3.prototype.constructor = ES5Element3;
		customElements.define('es5-element-3', ES5Element3);
		const container = document.createElement('div');
		container.innerHTML = '<es5-element-3></es5-element-3>';
		const el = container.querySelector('es5-element-3');
		proclaim.isInstanceOf(el, ES5Element3);
		proclaim.isInstanceOf(el, HTMLElement);
		proclaim.equal(el.tagName, 'ES5-ELEMENT-3');
	});
});
