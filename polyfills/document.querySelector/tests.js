it('returns the right length', function () {
	expect(document.querySelectorAll('body').length).to.be(1);
});

it('matches element by tag', function () {
	expect(document.querySelector('body')).to.be(document.body);
});

it('matches element by id', function () {
	var
	element = document.body.appendChild(document.createElement('p')),
	id = element.id = 'id' + String(Math.random()).slice(3);

	expect(document.querySelector('#' + id)).to.be(element);
});

it('matches element by class', function () {
	var element = document.body.appendChild(document.createElement('p'));

	element.className = 'foo bar qux';

	expect(document.querySelector('.bar')).to.be(element);
});

/*
 * Skipped: I don't believe it's possible to determine reliably whether the CSS engine
 * was able to parse the selector, so some browsers will return false for an invalid
 * selector rather than throwing the expected SyntaxError.
 *
it('throws an exception for invalid selectors', function () {
	expect(function () {
		document.querySelector("an>invalid<:selector");
	}).to.throwException();
});
 */
