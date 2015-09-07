function create(html) {
	var div = document.createElement('div');
	div.innerHTML = html;
	return div.firstChild;
}
function htmlify(el) {
	return el.outerHTML.toLowerCase().replace(/^[\r\n\s]+/, '').replace(/[\r\n\s]+$/, '');
}

it("should clone a node by name", function() {
	var clone = create('<div></div>').cloneNode();
	expect(clone.nodeName).to.be("DIV");
	expect(clone.outerHTML).to.match(/^\s*<div><\/div>\s*$/i);
});

it('should do deep copy', function() {
	var clone = create('<p>text <b>content</b></p>').cloneNode(true);
	expect(htmlify(clone)).to.be('<p>text <b>content</b></p>')
})

it('should do shallow copy', function() {
	var clone = create('<p>text <b>content</b></p>').cloneNode(false);
	expect(htmlify(clone)).to.be('<p></p>')
})

it("should clone attributes in shallow mode", function() {
	var clone = create('<div class="foo" test="test"></div>').cloneNode(false);
	expect(clone.nodeName).to.be("DIV");
	expect(clone.innerHTML).to.be('');
	expect(clone.getAttribute('test')).to.be('test');
	expect(clone.getAttribute('class')).to.be('foo');
	expect(clone.className).to.be('foo');
});

it('should clone self-closing elements', function() {
	var clone = create('<br>').cloneNode();
	expect(clone.nodeName).to.be("BR");
	expect(htmlify(clone)).to.match(/^<br( \/)?>$/);
});

it('should retain checked state of checkbox elements', function() {
	var inp = create("<input type='checkbox' />");
	inp.checked = true;
	var clone = inp.cloneNode();
	expect(clone.nodeName).to.be("INPUT");
	expect(clone.checked).to.be(true);
});

/* TEST SKIPPED: this doesn't work in IE < 9, which results in <:nav></:nav>.  Support for this could probably be added to the polyfill */
it.skip('can clone HTML5 elements', function() {
	var clone = document.createElement('nav').cloneNode();
	expect(htmlify(clone)).to.be('<nav></nav>');
});
