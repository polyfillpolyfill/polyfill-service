/* eslint-env mocha, browser */
/* global proclaim */

var element;

function nameOf(fn) {
    return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
}

beforeEach(function () {
    element = document.createElement('div');
});

it('has correct instance', function () {
    proclaim.isInstanceOf(element.getAttributeNames, Function);
});

it('has correct name', function () {
    proclaim.equal(nameOf(element.getAttributeNames), 'getAttributeNames');
});

it('has correct argument length', function () {
    proclaim.equal(element.getAttributeNames.length, 0);
});

it("should return an array", function() {
    element.setAttribute("name", "foo");
    var attributeNames = element.getAttributeNames();
    proclaim.isArray(attributeNames);
});

it("should return an empty array when no attributes", function() {
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 0);
});

it("should return the list of all attribute names", function() {
    element.setAttribute("name", "foo");
    element.setAttribute("class", "is-big");
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "name");
    proclaim.include(attributeNames, "class");
});

it("should return the list of all attribute names including id", function() {
    element.id = "container";
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 1);
    proclaim.include(attributeNames, "id");
});

it("should return the list of all attribute names including data attributes", function() {
    element.setAttribute("data-drop", true);
    element.setAttribute("data-drag", false);
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "data-drop");
    proclaim.include(attributeNames, "data-drag");
});
