it("Should return the first ancestor that matches selectors", function() {
	var el = document.createElement("p");
	var firstInnerEl = document.createElement("a");
	el.className = "baz";

	el.appendChild(firstInnerEl);

	var closest = firstInnerEl.closest("p");
	expect(closest).to.be(el);
	expect(closest.className).to.be("baz");
});

it("Should return the first inclusive ancestor that matches selectors", function() {
	var el = document.createElement("p");
	var firstInnerEl = document.createElement("a");
	el.className = "baz";
	firstInnerEl.className = "foo";

	el.appendChild(firstInnerEl);

	var closest = firstInnerEl.closest("a");
	expect(closest).to.be(firstInnerEl);
	expect(closest.className).to.be("foo");
});

it("Should return null if there are no matches", function() {
	var el = document.createElement("a");
	expect(el.closest("p")).to.be(null);
});

it("Should throw an error if the selector syntax is incorrect", function() {
	var el = document.createElement("a");
	expect(function () { el.closest("p<incorrectselector:><") }).to.throwException();
});
