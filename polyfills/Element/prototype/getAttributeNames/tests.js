/* eslint-env mocha, browser */
/* global proclaim */

it("should return an array", function() {
    var div = document.createElement("div");
    div.setAttribute("name", "foo");
    var attributeNames = div.getAttributeNames();
    proclaim.isArray(attributeNames);
});

it("should return an empty array when no attributes", function() {
    var div = document.createElement("div");
    var attributeNames = div.getAttributeNames();
    proclaim.equal(attributeNames.length, 0);
});

it("should return the list of all attribute names", function() {
    var div = document.createElement("div");
    div.setAttribute("name", "foo");
    div.setAttribute("class", "is-big");
    var attributeNames = div.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "name");
    proclaim.include(attributeNames, "class");
});

it("should return the list of all attribute names including id", function() {
    var div = document.createElement("div");
    div.id = "container";
    var attributeNames = div.getAttributeNames();
    proclaim.equal(attributeNames.length, 1);
    proclaim.include(attributeNames, "id");
});

it("should return the list of all attribute names including data attributes", function() {
    var div = document.createElement("div");
    div.setAttribute("data-drop", true);
    div.setAttribute("data-drag", false);
    var attributeNames = div.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "data-drop");
    proclaim.include(attributeNames, "data-drag");
});
