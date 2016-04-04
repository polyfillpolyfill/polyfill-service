
var rootEl, childEl, io;

beforeEach(function() {
	io = null;
	rootEl = document.createElement('div');
	rootEl.setAttribute('style', 'display:block; position: relative; width: 200px; height: 100px; overflow: auto; background: #bbb');
	childEl = document.createElement('div');
	childEl.setAttribute('style', 'display:block; position: absolute; width: 20px; height: 20px; background: #f00');
});

afterEach(function() {
	if (io && 'disconnect' in io) io.disconnect();
	if (childEl.parentNode) childEl.parentNode.removeChild(childEl);
	if (rootEl.parentNode) rootEl.parentNode.removeChild(rootEl);
});


it("throws when root is not in the DOM", function() {
	document.body.appendChild(childEl);
	io = new IntersectionObserver(function(){}, {root: rootEl});
	expect(function() {
		io.observe(childEl);
	}).to.throwException();
});

it("throws when observed is not in the DOM", function() {
	document.body.appendChild(rootEl);
	io = new IntersectionObserver(function(){}, {root: rootEl});
	expect(function() {
		io.observe(childEl);
	}).to.throwException();
});

it("throws if root does not contain child", function() {
	document.body.appendChild(rootEl);
	document.body.appendChild(childEl);
	io = new IntersectionObserver(function(){}, {root: rootEl});
	expect(function() {
		io.observe(childEl);
	}).to.throwException();
});

it("triggers if elements already intersect when observing begins", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function() { throw new Error("This shouldn't be called since we always takeRecords."); },
		{root: rootEl}
	);

	io.observe(childEl);

	var records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(1);
});

it("triggers if elements do not intersect when observing begins", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function() { throw new Error("This shouldn't be called since we always takeRecords."); },
		{root: rootEl}
	);

	childEl.style.top = "-50px";

	io.observe(childEl);

	var records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(0);
});

it("reports at threshold correctly", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function() { throw new Error("This shouldn't be called since we always takeRecords."); },
		{root: rootEl, threshold: 0.5}
	);

	io.observe(childEl);

	var records;
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(1);

	childEl.style.top = "-11px";
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be.lessThan(0.5);

	childEl.style.top = "-16px";
	records = io.takeRecords();
	expect(records.length).to.be(0);

	childEl.style.top = "-10px";
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(0.5);
});

it("reports at multiple thresholds", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function() { throw new Error("This shouldn't be called since we always takeRecords."); },
		{root: rootEl, threshold: [0.5, 0.25]}
	);

	io.observe(childEl);

	var records;
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(1);

	childEl.style.top = "-11px";
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be.lessThan(0.5);
	expect(records[0].intersectionRatio).to.be.greaterThan(0.25);

	childEl.style.top = "-16px";
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be.lessThan(0.25);

	childEl.style.top = "-17px";
	records = io.takeRecords();
	expect(records.length).to.be(0);

	childEl.style.top = "-15px";
	records = io.takeRecords();
	expect(records.length).to.be(1);
	expect(records[0].intersectionRatio).to.be(0.25);
});

it("supports margins", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function() { throw new Error("This shouldn't be called since we always takeRecords."); },
		{root: rootEl, margin: "5px 10% 10% 15px"}
	);

	io.observe(childEl);
	io.takeRecords();

	// Stop intersecting from the top.
	childEl.style.top = "-25px";
	expect(io.takeRecords().length).to.be(1);

	// Start intersecting from the top.
	childEl.style.top = "-24px";
	expect(io.takeRecords().length).to.be(1);

	// Stop intersecting from the bottom.
	childEl.style.top = "110px";
	expect(io.takeRecords().length).to.be(1);

	// Start intersecting from the bottom.
	childEl.style.top = "109px";
	expect(io.takeRecords().length).to.be(1);

	// Stop intersecting from the left.
	childEl.style.left = "-35px";
	expect(io.takeRecords().length).to.be(1);

	// Start intersecting from the left.
	childEl.style.left = "-34px";
	expect(io.takeRecords().length).to.be(1);

	// Stop intersecting from the right.
	childEl.style.left = "220px";
	expect(io.takeRecords().length).to.be(1);

	// Start intersecting from the right.
	childEl.style.left = "219px";
	expect(io.takeRecords().length).to.be(1);
});
