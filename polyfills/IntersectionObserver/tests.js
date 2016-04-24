
var rootEl, childEl, io;

function promiseAnimationFrame() {
	return new Promise(function(resolve) {
		requestAnimationFrame(function() {
			resolve();
		});
	});
}

function await(f, timeout) {
	var stack = new Error().stack;
	return function() {
		return new Promise(function(resolve) {
			var timeoutId = setTimeout(function() {
				throw new Error("Timed out " + stack);
			}, timeout);
			intervalId = setInterval(function() {
				if(f()) {
					clearInterval(intervalId);
					clearTimeout(timeoutId);
					resolve();
				}
			}, 50);
		});
	};
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
		function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(1);
			done();
		},
		{root: rootEl}
	);

	io.observe(childEl);
});

it("triggers if elements do not intersect when observing begins", function() {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	io = new IntersectionObserver(
		function(records) {
			expect(records.length).to.be(1);
			expect(records[0].intersectionRatio).to.be(0);
			done();
		},
		{root: rootEl}
	);

	childEl.style.top = "-50px";
	io.observe(childEl);
});

it("reports at threshold correctly", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var callCounter = 0;
	io = new IntersectionObserver(
		function(records) {
			switch(callCounter) {
				case 0:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be(1);
				break;
				case 1:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be.lessThan(0.5);
				break;
				case 2:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be.greaterThan(0.5);
				break;
				default:
				throw new Error("Too many calls");
			}
			callCounter++;
		},
		{root: rootEl, threshold: 0.5}
	);

	io.observe(childEl);

	promiseAnimationFrame()
	.then(await(function(){return callCounter == 1;}, 500))
	.then(function() {
		childEl.style.top = "-11px";
	})
	.then(await(function(){return callCounter == 2;}, 500))
	.then(function() {
		childEl.style.top = "-16px";
	})
	.then(promiseAnimationFrame)
	.then(function() {
		expect(io.takeRecords().length).to.be(0);
		expect(callCounter).to.be(2);
		childEl.style.top = "-5px";
	})
	.then(await(function(){return callCounter == 3;}, 500))
	.then(done);
});

it("reports at multiple thresholds", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var callCounter = 0;
	io = new IntersectionObserver(
		function(records) {
			switch(callCounter) {
				case 0:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be(1);
				break;
				case 1:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be.lessThan(0.5);
				expect(records[0].intersectionRatio).to.be.greaterThan(0.25);
				break;
				case 2:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be.lessThan(0.25);
				break;
				case 3:
				expect(records.length).to.be(1);
				expect(records[0].intersectionRatio).to.be(0.25);
				break;
				default:
				throw new Error("Too many calls");
			}
			callCounter++;
		},
		{root: rootEl, threshold: [0.5, 0.25]}
	);

	io.observe(childEl);

	promiseAnimationFrame()
	.then(await(function(){return callCounter == 1;}, 500))
	.then(function() {
		childEl.style.top = "-11px";
	})
	.then(await(function(){return callCounter == 2;}, 500))
	.then(function() {
		childEl.style.top = "-16px";
	})
	.then(await(function(){return callCounter == 3;}, 500))
	.then(function() {
		childEl.style.top = "-17px";
	})
	.then(promiseAnimationFrame)
	.then(function() {
		expect(io.takeRecords().length).to.be(0);
		expect(callCounter).to.be(3);
		childEl.style.top = "-15px";
	})
	.then(await(function(){return callCounter == 4;}, 500))
	.then(done);
});

it("supports margins", function(done) {
	rootEl.appendChild(childEl);
	document.body.appendChild(rootEl);

	var callCounter = 0;
	io = new IntersectionObserver(
		function(records) {
			if(callCounter <= 6) {
				expect(records.length).to.be(1);
			} else {
				throw new Error("Too many calls");
			}
			callCounter++;
		},
		{root: rootEl, margin: "5px 10% 10% 15px"}
	);

	io.observe(childEl);

	childEl.style.top = "-15px";
	promiseAnimationFrame()
	.then(await(function(){return callCounter == 1;}, 500))
	.then(function() {
		childEl.style.top = "-14px";
	})
	.then(await(function(){return callCounter == 2;}, 500))
	.then(function() {
		childEl.style.top = "86px";
	})
	.then(await(function(){return callCounter == 3;}, 500))
	.then(function() {
		childEl.style.top = "87px";
	})
	.then(promiseAnimationFrame)
	.then(await(function(){return callCounter == 3;}, 500))
	.then(function() {
		childEl.style.top = "0px";
		childEl.style.left = "0px";
	})
	.then(await(function(){return callCounter == 4;}, 500))
	.then(function() {
		childEl.style.left = "-1px";
	})
	.then(promiseAnimationFrame)
	.then(await(function(){return callCounter == 4;}, 500))
	.then(function() {
		childEl.style.left = "1px";
	})
	.then(await(function(){return callCounter == 5;}, 500))
	.then(function() {
		childEl.style.left = "180px";
	})
	.then(await(function(){return callCounter == 6;}, 500))
	.then(function() {
		childEl.style.left = "181px";
	})
	.then(promiseAnimationFrame)
	.then(await(function(){return callCounter == 6;}, 500))
	.then(done);
});
