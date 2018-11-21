/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
    proclaim.isFunction(NodeList.prototype.forEach);
});

it('has correct arity', function () {
    proclaim.arity(NodeList.prototype.forEach, 1);
});

it('has correct name', function () {
    proclaim.hasName(NodeList.prototype.forEach, 'forEach');
});

it('is Array.prototype.forEach', function () {
    proclaim.deepStrictEqual(NodeList.prototype.forEach, Array.prototype.forEach);
});