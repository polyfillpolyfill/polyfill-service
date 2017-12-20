/* eslint-env mocha, browser */
/* global proclaim */

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
	proclaim.equal(clone.nodeName, "DIV");
	proclaim.match(clone.outerHTML, /^\s*<div><\/div>\s*$/i);
});

it('should do deep copy', function() {
	var clone = create('<p>text <b>content</b></p>').cloneNode(true);
	proclaim.equal(htmlify(clone), '<p>text <b>content</b></p>');
});

it('should do shallow copy', function() {
	var clone = create('<p>text <b>content</b></p>').cloneNode(false);
	proclaim.equal(htmlify(clone), '<p></p>');
});

it("should clone attributes in shallow mode", function() {
	var clone = create('<div class="foo" test="test"></div>').cloneNode(false);
	proclaim.equal(clone.nodeName, "DIV");
	proclaim.equal(clone.innerHTML, '');
	proclaim.equal(clone.getAttribute('test'), 'test');
	proclaim.equal(clone.getAttribute('class'), 'foo');
	proclaim.equal(clone.className, 'foo');
});

it('should clone self-closing elements', function() {
	var clone = create('<br>').cloneNode();
	proclaim.equal(clone.nodeName, "BR");
	proclaim.match(htmlify(clone), /^<br( \/)?>$/);
});

it('should retain checked state of checkbox elements', function() {
	var inp = create("<input type='checkbox' />");
	inp.checked = true;
	var clone = inp.cloneNode();
	proclaim.equal(clone.nodeName, "INPUT");
	proclaim.equal(clone.checked, true);
});

/* TEST SKIPPED: this doesn't work in IE < 9, which results in <:nav></:nav>.  Support for this could probably be added to the polyfill */
it.skip('can clone HTML5 elements', function() {
	var clone = document.createElement('nav').cloneNode();
	proclaim.equal(htmlify(clone), '<nav></nav>');
});
