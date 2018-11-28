/* eslint-env mocha */
/* globals proclaim, DOMTokenList */

describe.skip('DOMTokenList', function () {
	describe('constructor', function () {
		it('is a function', function () {
			proclaim.isFunction(DOMTokenList);
		});

		it('has correct name', function () {
			proclaim.hasName(DOMTokenList, 'DOMTokenList');
		});

		it('is not enumerable', function () {
			proclaim.isNotEnumerable(window, 'DOMTokenList');
		});

		it('has correct arity', function () {
			proclaim.arity(DOMTokenList, 0);
		});

		it('throws error if called as a normal function', function () {
			proclaim.throws(function () {
				DOMTokenList(); // eslint-disable-line new-cap
			});
		});
		it('throws error if called as a constructor function', function () {
			proclaim.throws(function () {
				new DOMTokenList();
			});
		});
	});

    var dpSupport = true;
    /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
    try {
        Object.defineProperty({}, "support", {
            configurable: false,
            get: function () {},
            set: function () {}
        });
    } catch (e) {
        dpSupport = false;
    }
	var hasGetOwnPropertyDescriptor = dpSupport && 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
	if (hasGetOwnPropertyDescriptor) {
        describe('DOMTokenList.prototype.value', function() {
            var descriptor = Object.getOwnPropertyDescriptor(DOMTokenList.prototype, 'value');
            it('has a getter function', function () {
				proclaim.isFunction(descriptor.get);
			});
			it('has a setter function', function () {
				proclaim.isFunction(descriptor.set);
			});
			it('is not writable', function () {
				proclaim.doesNotInclude(descriptor, 'writable');
			});
			it('does not have a value', function () {
				proclaim.doesNotInclude(descriptor, 'value');
			});
        });
    }

    describe('DOMTokenList.prototype.item', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.item);
        });
    });
    describe('DOMTokenList.prototype.contains', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.contains);
        });
    });
    describe('DOMTokenList.prototype.add', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.add);
        });
    });
    describe('DOMTokenList.prototype.remove', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.remove);
        });
    });
    describe('DOMTokenList.prototype.toggle', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.toggle);
        });
    });
    describe('DOMTokenList.prototype.replace', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.replace);
        });
    });
    describe('DOMTokenList.prototype.toString', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.toString);
        });
    });
    
    //TODO: Implement these in the polyfill
    describe.skip('DOMTokenList.prototype.supports', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.supports);
        });
    });
    describe.skip('DOMTokenList.prototype.entries', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.entries);
        });
    });
    describe.skip('DOMTokenList.prototype.forEach', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.forEach);
        });
    });
    describe.skip('DOMTokenList.prototype.keys', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.keys);
        });
    });
    describe.skip('DOMTokenList.prototype.values', function() {
        it('is a function', function(){
            proclaim.isFunction(DOMTokenList.prototype.values);
        });
    });
});