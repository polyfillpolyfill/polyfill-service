/* eslint-env mocha, browser */
/* global proclaim, it */

// Test borrowed from:
// https://github.com/webcomponents/custom-elements/blob/1b2ad174411aab7cccb8231214399bb033dd5d49/tests/html/shim.html#L27
it('can create a custom HTML tag', function() {
	customElements.define('x-foo', class extends HTMLElement {
		static get is() {
			return 'x-foo';
		}
	});

	const el = document.createElement('x-foo');
	proclaim.isInstanceOf(el, HTMLElement);
	proclaim.equal(el.tagName, 'X-FOO');
});

