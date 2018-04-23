/* eslint-env mocha, browser */
/* global proclaim */

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

if (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
	it("should find the ancestor of an SVG element", function() {
		var el = document.body.appendChild(document.createElement("section"));
		el.className = 'svg-holder';

		var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		el.appendChild(svgElement);

		var closest = svgElement.closest("section.svg-holder");
		proclaim.equal(closest, el);

		document.body.removeChild(el);
	});

	it("should find the ancestor of a <rect> inside an inline SVG element", function() {
		var el = document.body.appendChild(document.createElement("section"));
		el.className = 'svg-holder';

		var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		el.appendChild(svgElement);

		var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		svgElement.appendChild(rectElement);

		var closest = rectElement.closest("section.svg-holder");
		proclaim.equal(closest, el);

		document.body.removeChild(el);
	});
}

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

