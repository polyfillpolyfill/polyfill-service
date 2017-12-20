/* eslint-env mocha, browser */
/* global proclaim */

it("should return true if the element matches the tag selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	proclaim.equal(el.matches("p"), true);

	document.body.removeChild(el);
});

it("should return true if the element matches the class selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "foo";

	proclaim.equal(el.matches(".foo"), true);

	document.body.removeChild(el);
});

it("should return true for more complex selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "foo";

	proclaim.equal(el.matches("p.foo"), true);
});

it("should not match non-matching selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "bar";

	proclaim.equal(el.matches("a.bar"), false);

	document.body.removeChild(el);
});

it("should not match inner elements", function() {
	var el = document.body.appendChild(document.createElement("p"));

	var innerEl = document.createElement("a");

	el.appendChild(innerEl);

	proclaim.equal(el.matches("a"), false);

	document.body.removeChild(el);
});

/* Skipped: This exception is actually thrown by querySelector, and cannot be thrown by
 * the polyfill, so this test will fail in some UAs. For more info see querySelector polyfill.
 *
it("should throw an exception with an invalid selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	proclaim.throws(function () {
		el.matches("an>invalid<:selector");
	});

	document.body.removeChild(el);
});
 */
