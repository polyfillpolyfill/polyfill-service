/* eslint-env mocha, browser */
/* global proclaim */

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

it('has the well known symbol iterator as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.iterator, undefined);

	if (supportsDescriptors) {
		var iterator = Symbol.iterator;
		Symbol.iterator = "nope";
		proclaim.equal(Symbol.iterator, iterator);
	}
});

var hasNodeListGlobal = typeof NodeList !== 'undefined' ? it : xit;

hasNodeListGlobal('can attach to a NodeList correctly', function() {

	NodeList.prototype[Symbol.iterator] = function() {
		var called = false;
		var that = this;

		return {
			next: function() {
				if (called) {
					return {
						done: true
					};
				} else {
					called = true;
					return {
						done: false,
						value: that[0]
					};
				}
			}
		};
	};
	var ul = document.createElement('ul');
	ul.appendChild(document.createElement('li'));

	var dom = ul.childNodes;

	var iterator = dom[Symbol.iterator]();
	var entry;
	while(true) {
		entry = iterator.next();
		if (entry.done !== false) break;
		entry.value.innerHTML = 'Test';
	}

	proclaim.equal(dom[0].innerHTML, 'Test');
});
