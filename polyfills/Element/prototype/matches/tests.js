it("should return true if the element matches the tag selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	expect(el.matches("p")).to.be(true);

	document.body.removeChild(el);
});

it("should return true if the element matches the class selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "foo";

	expect(el.matches(".foo")).to.be(true);

	document.body.removeChild(el);
});

it("should return true for more complex selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "foo";

	expect(el.matches("p.foo")).to.be(true);
});

it("should not match non-matching selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));

	el.className = "bar";

	expect(el.matches("a.bar")).to.be(false);

	document.body.removeChild(el);
});

it("should not match inner elements", function() {
	var el = document.body.appendChild(document.createElement("p"));

	var innerEl = document.createElement("a");

	el.appendChild(innerEl);

	expect(el.matches("a")).to.be(false);

	document.body.removeChild(el);
});

/* Skipped: This exception is actually thrown by querySelector, and cannot be thrown by
 * the polyfill, so this test will fail in some UAs. For more info see querySelector polyfill.
 *
it("should throw an exception with an invalid selector", function() {
	var el = document.body.appendChild(document.createElement("p"));

	expect(function () {
		el.matches("an>invalid<:selector");
	}).to.throwException();

	document.body.removeChild(el);
});
 */
