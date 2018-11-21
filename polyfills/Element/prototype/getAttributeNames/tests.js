/* eslint-env mocha, browser */
/* global proclaim */

function nameOf(fn) {
    return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
}

function createElement(type, attributes) {
	var element = null;

	try {
		var attributesString = '';
		for (var attribute in attributes) {
			if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
				attributesString += ' ' + attribute + '="' + attributes[attribute] + '"';
			}
		}
		element = document.createElement( "<" + type + attributesString + ">" );
	} catch( e ) {};

	if ( !element || (attributes && attributes.name && element.name.toLowerCase() !== attributes.name.toLowerCase())) {
		element = document.createElement(type);
		for (var attribute in attributes) {
			if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
				if (attribute === 'className') {
					element.setAttribute('class', attributes[attribute]);
				} else if (attribute === 'htmlFor') {
					element.setAttribute('for', attributes[attribute]);
				} else {
					element.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
	};

	return element;
 }

it('has correct instance', function () {
	var element = createElement('div');
    proclaim.isInstanceOf(element.getAttributeNames, Function);
});

it('has correct name', function () {
	var element = createElement('div');
    proclaim.equal(nameOf(element.getAttributeNames), 'getAttributeNames');
});

it('has correct argument length', function () {
	var element = createElement('div');
    proclaim.equal(element.getAttributeNames.length, 0);
});

it("should return an array", function () {
	var element = createElement('div', {name: 'foo'});
    var attributeNames = element.getAttributeNames();
    proclaim.isArray(attributeNames);
});

it("should return an empty array when no attributes", function () {
	var element = createElement('div');
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 0);
});

it("should return the list of all attribute names", function () {
	var element = createElement('div', {
		name: 'foo',
		className: 'is-big'
	});
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "name");
	try {
		proclaim.include(attributeNames, "class");
	} catch (e) {
		// IE 7 doesn't allow setAttribute to work with `class`, have to use property assignment use the name `className`
		proclaim.include(attributeNames, "className");
	}
});

it("should return the list of all attribute names including id", function () {
	var element = createElement('div', {id:'container'});
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 1);
    proclaim.include(attributeNames, "id");
});

it("should return the list of all attribute names including data attributes", function () {
	var element = createElement('div', {
		'data-drop': true,
		'data-drag': false
	});
    var attributeNames = element.getAttributeNames();
    proclaim.equal(attributeNames.length, 2);
    proclaim.include(attributeNames, "data-drop");
    proclaim.include(attributeNames, "data-drag");
});
