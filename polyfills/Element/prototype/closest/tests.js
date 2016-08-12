/* eslint-env mocha, browser*/
/* global proclaim, it */

it("should return the first ancestor that matches selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));
	var firstInnerEl = document.createElement("a");
	el.className = "baz";

	el.appendChild(firstInnerEl);

	var closest = firstInnerEl.closest("p");
	proclaim.equal(closest, el);
	proclaim.equal(closest.className, "baz");

	document.body.removeChild(el);
});

it("should return the first inclusive ancestor that matches selectors", function() {
	var el = document.body.appendChild(document.createElement("p"));
	var firstInnerEl = document.createElement("a");
	el.className = "baz";
	firstInnerEl.className = "foo";

	el.appendChild(firstInnerEl);

	var closest = firstInnerEl.closest("a");
	proclaim.equal(closest, firstInnerEl);
	proclaim.equal(closest.className, "foo");

	document.body.removeChild(el);
});

it("should return null if there are no matches", function() {
	var el = document.body.appendChild(document.createElement("a"));

	proclaim.equal(el.closest("p"), null);

	document.body.removeChild(el);
});


/* Skipped: This exception is actually thrown by querySelector, and cannot be thrown by
 * the polyfill, so this test will fail in some UAs. For more info see querySelector polyfill.
 */
it.skip("should throw an error if the selector syntax is incorrect", function() {
	var el = document.body.appendChild(document.createElement("a"));

	proclaim.throws(function () {
		el.closest("p<incorrectselector:><");
	});

	document.body.removeChild(el);
});

