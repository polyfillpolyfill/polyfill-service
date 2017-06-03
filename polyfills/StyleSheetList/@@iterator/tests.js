/* eslint-env mocha, browser*/
/* global proclaim, it */
'use strict';

it('is named \'values\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill
	if (StyleSheetList.prototype[Symbol.iterator].name) {
		try {
			proclaim.equal(StyleSheetList.prototype[Symbol.iterator].name, 'values');
		} catch (e) {
		}
	}
});

it('returns a next-able object', function () {
	var style = document.createElement('style');
	var head = document.querySelector('head');
	head.appendChild(style);
	var iterator = document.styleSheets[Symbol.iterator]();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: document.styleSheets[0],
		done: false
	});

	head.removeChild(style);
});

it('finally returns a done object', function () {
	var style = document.createElement('style');
	var head = document.querySelector('head');
	head.appendChild(style);
	var iterator = document.styleSheets[Symbol.iterator]();
	var length = document.styleSheets.length;
	var i = 0;
	while(i < length) {
		iterator.next();
		i = i + 1;
	}
	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: undefined,
		done: true
	});

	head.removeChild(style);
});
