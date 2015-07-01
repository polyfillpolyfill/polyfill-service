var spycalls = [];

var spy = function() {
	spycalls.push([].slice.call(arguments));
}

beforeEach(function () {
	spycalls = [];
});

it('should pass the correct arguments to the callback', function () {
	[1,2,3].reduce(spy);
	expect(spycalls.length).to.be(2);
	expect(spycalls[0]).to.eql([1, 2, 1, [1,2,3]]);
});
it('should start with the right initialValue', function () {
	[1,2,3].reduce(spy, 0);
	expect(spycalls.length).to.be(3);
	expect(spycalls[0]).to.eql([0, 1, 0, [1,2,3]]);
});
it('should not affect elements added to the array after it has begun', function () {
	var arr = [1,2,3], i = 0;
	arr.reduce(function (a, b) {
		i++;
		if (i <= 4) {
			arr.push(a + 3);
		}
		return b;
	});
	expect(arr).to.eql([1,2,3,4,5]);
	expect(i).to.be(2);
});
it('should work as expected for empty arrays', function () {
	expect(function () {
		[].reduce(spy);
	}).to.throwException();
	expect(spycalls.length).to.be(0);
});
it('should throw correctly if no callback is given', function () {
	expect(function () {
		[1,2,3].reduce();
	}).to.throwException();
});
it('should return the expected result', function () {
	expect([1,2,3,4,5,6,7].reduce(function (a, b) {
		return String(a || '') + String(b || '');
	})).to.eql([1,2,3,4,5,6,7].join(''));
});
it('should return the expected result with a string', function () {
	expect(Array.prototype.reduce.call('1234567', function (a, b) {
		return String(a || '') + String(b || '');
	})).to.eql([1,2,3,4,5,6,7].join(''));
});
it('should not directly affect the passed array', function () {
	var test = [1,2,3];
	var copy = [1,2,3];
	test.reduce(function (a, b) {
		return a + b;
	});
	expect(test).to.eql(copy);
});
it('should skip non-set values', function () {
	var test = [1,2,3];
	delete test[1];
	var visited = {};
	test.reduce(function (a, b) {
		if (a) { visited[a] = true; }
		if (b) { visited[b] = true; }
		return 0;
	});
	expect(visited).to.eql({ 1: true, 3: true });
});
it('should return an array with length 1', function () {
	expect([1,2,3].reduce.length).to.be(1);
});
