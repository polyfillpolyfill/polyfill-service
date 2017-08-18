/* eslint-env mocha, browser */
/* global proclaim */

it('finds an element using a class name', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.className = 'abcd';
	var a = document.getElementsByClassName('abcd');
	proclaim.equal(a.length, 1);
	document.body.removeChild(div);
});

it('converts undefined into a string', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.innerHTML = '<p class="undefined">foo</p><p class="undefined">foo</p>';
	proclaim.equal(document.getElementsByClassName(undefined).length, 2);
	proclaim.equal(document.getElementsByClassName("undefined").length, 2);
	document.body.removeChild(div);
});

it('supports multiple space-separated classes', function () {
	var div = document.body.appendChild(document.createElement('DIV'));
	div.innerHTML = '<p class="one two">foo</p><p class="one">foo</p><p class="two one"></p>';
	proclaim.equal(document.getElementsByClassName('one two').length, 2);
	document.body.removeChild(div);
});

