/* eslint-env mocha, browser */
/* global proclaim, Symbol */

function getDOMTokenList () {
	var div = document.createElement('div');
	div.className = 'class1 class2';
	return div.classList;
}

it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		proclaim.fail();
		return;
	}
	proclaim.isInstanceOf(getDOMTokenList()[Symbol.iterator], Function);
});

it('returns a next-able object', function () {
	var tokenList = getDOMTokenList();
	var iterator = tokenList[Symbol.iterator]();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: 'class1',
		done: false
	});
});

it('finally returns a done object', function () {
	var tokenList = getDOMTokenList();
	var iterator = tokenList[Symbol.iterator]();
	iterator.next();
	iterator.next();
	proclaim.deepEqual(iterator.next(), {
		done: true,
		value: undefined
	});
});
