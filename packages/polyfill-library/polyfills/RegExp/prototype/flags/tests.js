/* eslint-env mocha */
/* globals proclaim */

proclaim.isGetter = function (obj, prop) {
	if ('getOwnPropertyDescriptor' in Object) {
		proclaim.isFunction(Object.getOwnPropertyDescriptor(obj, prop).get);
	}
};

it('is a getter', function () {
	proclaim.isGetter(RegExp.prototype, 'flags');
});

// Tests ported from https://github.com/es-shims/es6-shim/blob/master/test/regexp.js#L197-L270

var arePropertyDescriptorsSupported = function() {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', {
			enumerable: false,
			value: obj
		});
		/* eslint-disable no-unused-vars, no-restricted-syntax */
		for (var _ in obj) {
			return false;
		}
		/* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};

var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var callAllowsPrimitives = (function () { return this === 3; }.call(3));
var ifCallAllowsPrimitivesIt = callAllowsPrimitives ? it : it.skip;
var getRegexLiteral = function (stringRegex) {
  try {
    return Function('return ' + stringRegex + ';')();
  } catch (e) { /**/ }
};

it('exists', function () {
	proclaim.isTrue('flags' in RegExp.prototype);
});

if (supportsDescriptors) {
	var regexpFlagsDescriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
	var testGenericRegExpFlags = function (object) {
		return regexpFlagsDescriptor.get.call(object);
	};

	it('has the correct descriptor', function () {
		proclaim.isTrue(regexpFlagsDescriptor.configurable);
		proclaim.isFalse(regexpFlagsDescriptor.enumerable);
		proclaim.isTrue(regexpFlagsDescriptor.get instanceof Function);
		proclaim.isUndefined(regexpFlagsDescriptor.set);
	});

	ifCallAllowsPrimitivesIt('throws when not called on an object', function () {
		var nonObjects = ['', false, true, 42, NaN, null, undefined];
		nonObjects.forEach(function (nonObject) {
			proclaim.throws(function () {
				testGenericRegExpFlags(nonObject);
			}, TypeError);
		});
	});

	it('has the correct flags on a literal', function () {
		proclaim.strictEqual((/a/g).flags, 'g');
		proclaim.strictEqual((/a/i).flags, 'i');
		proclaim.strictEqual((/a/m).flags, 'm');
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'sticky')) {
			proclaim.strictEqual(getRegexLiteral('/a/y').flags, 'y');
		}
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'unicode')) {
			proclaim.strictEqual(getRegexLiteral('/a/u').flags, 'u');
		}
	});

	it('has the correct flags on a constructed RegExp', function () {
		proclaim.strictEqual(new RegExp('a', 'g').flags, 'g');
		proclaim.strictEqual(new RegExp('a', 'i').flags, 'i');
		proclaim.strictEqual(new RegExp('a', 'm').flags, 'm');
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'sticky')) {
			proclaim.strictEqual(new RegExp('a', 'y').flags, 'y');
		}
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'unicode')) {
			proclaim.strictEqual(new RegExp('a', 'u').flags, 'u');
		}
	});

	it('returns flags sorted on a literal', function () {
		proclaim.strictEqual((/a/gim).flags, 'gim');
		proclaim.strictEqual((/a/mig).flags, 'gim');
		proclaim.strictEqual((/a/mgi).flags, 'gim');
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'sticky')) {
			proclaim.strictEqual(getRegexLiteral('/a/gyim').flags, 'gimy');
		}
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'unicode')) {
			proclaim.strictEqual(getRegexLiteral('/a/ugmi').flags, 'gimu');
		}
	});

	it('returns flags sorted on a constructed RegExp', function () {
		proclaim.strictEqual(new RegExp('a', 'gim').flags, 'gim');
		proclaim.strictEqual(new RegExp('a', 'mig').flags, 'gim');
		proclaim.strictEqual(new RegExp('a', 'mgi').flags, 'gim');
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'sticky')) {
			proclaim.strictEqual(new RegExp('a', 'mygi').flags, 'gimy');
		}
		if (Object.prototype.hasOwnProperty.call(RegExp.prototype, 'unicode')) {
			proclaim.strictEqual(new RegExp('a', 'mugi').flags, 'gimu');
		}
	});
}
