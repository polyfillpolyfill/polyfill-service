
it("Should be able to add a class and returns true when a class is added", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	classList.toggle("classA");
	expect(classList.contains("classA")).to.be(true);
});

it("Should be able to remove a class and return false when a class is removed", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "classA";

	expect(classList.toggle("classA")).to.be(false);
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

it("Should remove duplicate instances of class", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a a a";

	classList.remove("a");
	expect(classList.contains("a")).to.be(false);
	expect(el.className).to.be("");
});
