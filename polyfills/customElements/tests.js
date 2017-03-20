/* eslint-env mocha, browser */
/* global proclaim */

/**
 * Resolve on the next "tick", so that the custom elements can be initialized
 * before the assertions happen
 *
 * This is not necssary when the polyfill is not active, but is necessary with the polyfill
 *
 * @return {Promise} resolves after the current event loop finishes
 */
function pause() {
	return new Promise(function(resolve) {
		setTimeout(resolve, 0);
	});
}

describe('defining custom elements', function() {
	before(function() {
		customElements.define('x-foo', class extends HTMLElement {
			static get is() {
				return 'x-foo';
			}
		});
	});

	it('can define a new custom element', function() {
		const el = document.createElement('x-foo');
		proclaim.isInstanceOf(el, HTMLElement);
		proclaim.equal(el.tagName, 'X-FOO');
	});
});

describe('using custom elements', function() {
	before(function() {
		customElements.define('x-foo-b', class extends HTMLElement {
			constructor() {
				super();

				const shadow = this.attachShadow({mode: 'open'});
				shadow.innerHTML = `
					Hello, world!
					<slot></slot>
				`;
			}
		});
	});

	it('can insert a custom element into the DOM', function() {
		const p = document.createElement('p');
		p.innerHTML = `
			<x-foo-b></x-foo-b>
		`;

		return pause().then(function() {
			proclaim.equal(p.textContent.trim(), '');
			proclaim.equal(p.querySelector('x-foo-b').shadowRoot.textContent.trim(), 'Hello, world!');
		});
	});

	it('can slot content into a custom element', function() {
		const p = document.createElement('p');
		p.innerHTML = `
			<x-foo-b>
				Some inner text
			</x-foo-b>
		`;

		return pause().then(function() {
			proclaim.equal(p.textContent.trim(), 'Some inner text');
			proclaim.equal(p.querySelector('x-foo-b').shadowRoot.textContent.trim(), 'Hello, world!');
		});
	});
});
