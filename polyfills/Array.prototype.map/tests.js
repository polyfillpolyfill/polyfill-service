var callback;
var testSubject;
beforeEach(function () {
	var i = 0;
	callback = function () {
		return i++;
	};
	testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
	delete testSubject[1];
});

it('should call callback with the right parameters', function () {
	var args = [];
	var argsspy = function() { args = [].slice.call(arguments); };
	var array = [1];
	array.map(argsspy);
	expect(args).to.eql(['1', 0, array]);
});
it('should set the context correctly', function () {
	var context = {};
	testSubject.map(function (o,i) {
		this[i] = o;
	}, context);
	expect(context).to.eql(testSubject);
});
it('should set the right context when given none', function () {
	var context;
	[1].map(function () {context = this;});
	expect(context).to.be(function () { return this; }.call());
});
it('should not change the array it is called on', function () {
	var copy = testSubject.slice();
	testSubject.map(callback);
	expect(testSubject).to.eql(copy);
});
it('should only run for the number of objects in the array when it started', function () {
	var arr = [1,2,3],
		i = 0;
	arr.map(function (o) {
		arr.push(o + 3);
		i++;
		return o;
	});
	expect(arr).to.eql([1, 2, 3, 4, 5, 6]);
	expect(i).to.be(3);
});
it('should properly translate the values as according to the callback', function () {
	var result = testSubject.map(callback),
		expected = [0, 0, 1, 2, 3, 4, 5, 6];
	delete expected[1];
	expect(result).to.eql(expected);
});
it('should skip non-existing values', function () {
	var array = [1, 2, 3, 4],
		i = 0;
	delete array[2];
	array.map(function () {
		i++;
	});
	expect(i).to.be(3);
});
