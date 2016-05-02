
var rootEl, childEl, io;

function createRunner(actions) {
	var asyncTestAssertion;
	var done;
	var doTest = function() {
		if (actions.length === 0) return done();
		var next = actions.shift();
		var action = next[0];
		var isAsync = next[1];
		var assertion = next[2];
		asyncTestAssertion = (isAsync) ? assertion : function() {};

		childEl.scrollTop;  // Force render as substitute for requestAnimationFrame
		action();

		if (!isAsync) {
			assertion(io.takeRecords());
			doTest();
		}
	}
	return {
		"asyncAssert": function(records) {
			asyncTestAssertion(records);
			doTest();
		},
		"go": function(cb) {
			done = cb || function() {};
			doTest();
		}
	}
}

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


it("triggers if elements already intersect when observing begins", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(1);
			done();
		},
		{root: rootEl}
	);

	io.observe(childEl);
});

it("does not trigger if elements do not intersect when observing begins", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function(records) {
			expect().fail('should not trigger');
		},
		{root: rootEl}
	);

	childEl.style.top = "-50px";
	io.observe(childEl);
	setTimeout(done, 200);
});

it("reports at threshold correctly", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var runner = createRunner([
		[function() {}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(1);
		}],
		[function() {
			childEl.style.top = "-11px";
		}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be.lessThan(0.5);
		}],
		[function() {
			childEl.style.top = "-16px";
		}, false, function(records) {
			expect(records.length).to.be(0);
		}],
		[function() {
			childEl.style.top = "-10px";
		}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(0.5);
		}]
	]);
	io = new IntersectionObserver(
		runner.asyncAssert,
		{root: rootEl, threshold: 0.5}
	);
	io.observe(childEl);
	runner.go(done);
});

it("reports at multiple thresholds", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var runner = createRunner([
		[function() {}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(1);
		}],
		[function() {
			childEl.style.top = "-11px";
		}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be.lessThan(0.5);
			expect(records[0].intersectionRatio).to.be.greaterThan(0.25);
		}],
		[function() {
			childEl.style.top = "-16px";
		}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be.lessThan(0.25);
		}],
		[function() {
			childEl.style.top = "-17px";
		}, false, function(records) {
			expect(records.length).to.be(0);
		}],
		[function() {
			childEl.style.top = "-15px";
		}, true, function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(0.25);
		}]
	]);
	io = new IntersectionObserver(
		runner.asyncAssert,
		{root: rootEl, threshold: [0.5, 0.25]}
	);
	io.observe(childEl);
	runner.go(done);
});

it("supports margins", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var runner = createRunner([
		[function() {
			childEl.style.top = "-25px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "-24px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "110px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "109px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "-35px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "-34px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "220px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}],
		[function() {
			childEl.style.top = "219px";
		}, true, function(records) {
			expect(records.length).to.be(1);
		}]
	]);
	io = new IntersectionObserver(
		runner.asyncAssert,
		{root: rootEl, margin: "5px 10% 10% 15px"}
	);
	io.observe(childEl);
	runner.go(done);

});
