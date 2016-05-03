
it('returns identical objects for the same search', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.className = 'abcd';
	var a = document.getElementsByClassName('abcd');
	var b = document.getElementsByClassName('abcd');
	expect(a).to.be(b);
	expect(a.length).to.be(1);
	document.body.removeChild(div);
});

it('converts undefined into a string', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.innerHTML = '<p class="undefined">foo</p><p class="undefined">foo</p>';
	expect(document.getElementsByClassName(undefined).length).to.be(2);
	expect(document.getElementsByClassName("undefined").length).to.be(2);
	document.body.removeChild(div);
});

it('supports multiple space-separated classes', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.innerHTML = '<p class="one two">foo</p><p class="one">foo</p><p class="two one"></p>';
	expect(document.getElementsByClassName('one two').length).to.be(2);
	document.body.removeChild(div);
});

