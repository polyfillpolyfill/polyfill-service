it("Should remove duplicate instances of class", function() {
	var el = document.createElement("p");
	var classList = el.classList;
	el.className = "a a a";

	classList.remove("a");
	expect(classList.contains("a")).to.be(false);
	expect(el.className).to.be("");
});
