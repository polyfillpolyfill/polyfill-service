it('Returns right length', function () {
	expect(document.querySelectorAll('body').length).to.be(1);
});

it('Matches element by tag', function () {
	expect(document.querySelector('body')).to.be(document.body);
});

it('Matches element by id', function () {
	var
	element = document.body.appendChild(document.createElement('p')),
	id = element.id = 'id' + String(Math.random()).slice(3);

	expect(document.querySelector('#' + id)).to.be(element);
});


it('Matches element by class', function () {
	var element = document.body.appendChild(document.createElement('p'));

	element.className = 'foo bar qux';

	expect(document.querySelector('.bar')).to.be(element);
});
