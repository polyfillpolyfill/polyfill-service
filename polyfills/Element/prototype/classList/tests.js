/* eslint-env mocha, browser */
/* global proclaim */

it("Should be able to add a class using #toggle", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	classList.toggle("classA");
	proclaim.equal(classList.contains("classA"), true);
});

it("Should be able to remove a class using #toggle and return false when indicating class is removed", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "classA";

	proclaim.equal(classList.toggle("classA"), false);
	proclaim.equal(classList.contains("classA"), false);
});

it("Should allow classes to be added using #add", function() {
	var el = document.createElement("p");
	var classList = el.classList;

	classList.add("classA");
	proclaim.equal(classList.contains("classA"), true);
});

it("Should allow multiple classes to be added using #add", function() {
	var el = document.createElement("p");
	var classList = el.classList;

	classList.add("classA", "classB");
	proclaim.isTrue(classList.contains("classA"));
	proclaim.isTrue(classList.contains("classB"));
});

it("Should allow multiple classes to be removed using #remove", function() {
	var el = document.createElement("p");
	var classList = el.classList;

	classList.add("classA");
	classList.add("classB");
	classList.remove("classA", "classB");
	proclaim.isFalse(classList.contains("classA"));
	proclaim.isFalse(classList.contains("classB"));
});

it("Should force add a class using toggle if the second argument is true", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	classList.add("classA");
	classList.toggle("classA", true);
	proclaim.equal(classList.contains("classA"), true);
});

it("Should be indexable", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	proclaim.equal(classList[0], 'a');
	proclaim.equal(classList[1], 'b');
});

it("Should be indexable using the #item method", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	proclaim.equal(classList.item(0), 'a');
	proclaim.equal(classList.item(1), 'b');
});

it("Should return the length using the #length method", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	proclaim.equal(el.classList.length, 2);
	proclaim.equal(classList.length, 2);
});

it("Should remove duplicate instances of class", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a a a";

	classList.remove("a");
	proclaim.equal(classList.contains("a"), false);
	proclaim.equal(el.className, "");
});

it("Should work on svg elements", function() {
	if (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg')) {
		var el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var classList = el.classList;
		el.setAttribute('class', 'a');

		classList.add("b");
		proclaim.equal(classList.contains("b"), true);
		proclaim.equal(el.className.baseVal, "a b");
	}
});

it("Should be configurable", function() {
	proclaim.equal(Object.getOwnPropertyDescriptor(Element.prototype, 'classList').configurable, true);
});
