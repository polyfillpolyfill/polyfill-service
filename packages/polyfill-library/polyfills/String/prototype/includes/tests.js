/* eslint-env mocha */
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(String.prototype.includes);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.includes, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.includes, 'includes');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'includes');
});

it('works as expected', function(){
    var re, O;
    proclaim.isFalse('abc'.includes());
    proclaim.isTrue('aundefinedb'.includes());
    proclaim.isTrue('abcd'.includes('b', 1));
    proclaim.isFalse('abcd'.includes('b', 2));
    var supportsStrictModeTests = (function () {
			'use strict';

			return this === undefined;
		}).call(undefined);

		if (supportsStrictModeTests) {
      proclaim.throws(function(){
        String.prototype.includes.call(null, '.');
      }, TypeError);
      proclaim.throws(function(){
        String.prototype.includes.call(undefined, '.');
      }, TypeError);
    }
    re = /./;
    proclaim.throws(function(){
      '/./'.includes(re);
		}, TypeError);
	if ('Symbol' in window && 'match' in Symbol) {
		re[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : undefined] = false;
		proclaim.isTrue('/./'.includes(re));
	}
    O = {};
    proclaim.isTrue('[object Object]'.includes(O));
	if ('Symbol' in window && 'match' in Symbol) {
		O[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : undefined] = true;
		proclaim.throws(function () {
			'[object Object]'.includes(O);
		}, TypeError);
	}
});
