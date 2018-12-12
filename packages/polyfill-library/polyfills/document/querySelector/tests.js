/* eslint-env mocha, browser */
/* global proclaim */

it('returns the right length', function () {
	proclaim.equal(document.querySelectorAll('body').length, 1);
});

it('matches element by tag', function () {
	proclaim.equal(document.querySelector('body'), document.body);
});

it('matches element by id', function () {
	var
	element = document.body.appendChild(document.createElement('p')),
	id = element.id = 'id' + String(Math.random()).slice(3);

	proclaim.equal(document.querySelector('#' + id), element);
});

it('matches element by class', function () {
	var element = document.body.appendChild(document.createElement('p'));

	element.className = 'foo bar qux';

	proclaim.equal(document.querySelector('.bar'), element);
});

/*
 * Skipped: I don't believe it's possible to determine reliably whether the CSS engine
 * was able to parse the selector, so some browsers will return false for an invalid
 * selector rather than throwing the expected SyntaxError.
 *
it('throws an exception for invalid selectors', function () {
	proclaim.throws(function () {
		document.querySelector("an>invalid<:selector");
	});
});
 */
