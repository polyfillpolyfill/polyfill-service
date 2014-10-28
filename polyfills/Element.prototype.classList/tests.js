
it("Should be able to add a class using #toggle", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	classList.toggle("classA");
	expect(classList.contains("classA")).to.be(true);
});

it("Should be able to remove a class using #toggle and return false when indicating class is removed", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "classA";

	expect(classList.toggle("classA")).to.be(false);
	expect(classList.contains("classA")).to.be(false);
});

it("Should allow classes to be added using #add", function() {
	var el = document.createElement("p");
	var classList = el.classList;

	classList.add("classA");
	expect(classList.contains("classA")).to.be(true);
});

it("Should force add a class using toggle if the second argument is true", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	classList.add("classA");
	classList.toggle("classA", true);
	expect(classList.contains("classA")).to.be(true);
});

it("Should be indexable", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	expect(classList[0]).to.be('a');
	expect(classList[1]).to.be('b');
});

it("Should be indexable using the #item method", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	expect(classList.item(0)).to.be('a');
	expect(classList.item(1)).to.be('b');
});

it("Should return the length using the #length method", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a b";

	// for old ie
	classList.toString();

	expect(classList.length).to.be(2);
});

it("Should remove duplicate instances of class", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a a a";

	classList.remove("a");
	expect(classList.contains("a")).to.be(false);
	expect(el.className).to.be("");
});
