/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.clz32);
});

it('has correct arity', function () {
	proclaim.arity(Math.clz32, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.clz32, 'clz32');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'clz32');
});

var supportsGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function' && (function() {
    try {
    	var object = {};
        object.test = 0;
        return Object.getOwnPropertyDescriptor(
            object,
            "test"
        ).value === 0;
    } catch (exception) {
        return false;
    }
}());

var functionsHaveNames = (function foo() {}).name === 'foo';

it('should return 32 if passed 0', function() {
	proclaim.equal(Math.clz32(0), 32);
	proclaim.equal(Math.clz32(-0), 32);
});

// Copyright (c) 2014 Ryan Lewis. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
author: Ryan Lewis
description: Math.clz32 should return 31 if passed 1.
---*/

it('should return 31 if passed 1', function() {
	proclaim.equal(Math.clz32(1), 31);
});


// Copyright (c) 2014 Ryan Lewis. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
author: Ryan Lewis
description: Math.clz32 should return 0 if passed 2147483648
---*/

it('should return 0 if passed 2147483648', function() {
	proclaim.equal(Math.clz32(2147483648), 0);
});


// Copyright (C) 2016 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
esid: sec-math.clz32
description: >
  Return 32 if x is NaN
info: |
  Math.clz32 ( x )

  1. Let n be ToUint32(x).
  2. Let p be the number of leading zero bits in the 32-bit binary representation of n.
  3. Return p.

  7.1.6 ToUint32 ( argument )

  [...]
  2. If number is NaN, +0, -0, +∞, or -∞, return +0.
  [...]
---*/

it('should return 32 if x is NaN', function() {
	proclaim.equal(Math.clz32(NaN), 32);
});


// Copyright (C) 2015 André Bargull. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
description: >
  Math.clz32.name is "clz32".
info: >
  Math.clz32 ( x )

  17 ECMAScript Standard Built-in Objects:
    Every built-in Function object, including constructors, that is not
    identified as an anonymous function has a name property whose value
    is a String.

    Unless otherwise specified, the name property of a built-in Function
    object, if it exists, has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
includes: [propertyHelper.js]
---*/

it('should have name \'clz32\'', function() {
	if (functionsHaveNames) {
		proclaim.equal(Math.clz32.name, 'clz32');
	} else {
		this.skip();
	}
});

// This test is not important to pass for a polyfill
xit('should have name as non-enumerable', function() {
	if (functionsHaveNames && supportsGetOwnPropertyDescriptor) {
		var descr = Object.getOwnPropertyDescriptor(Math.clz32, 'name');
		var expected = {
				enumerable: false,
				configurable: true,
				value: 'clz32',
				writable: false
		};

		proclaim.deepEqual(descr, expected);
	} else {
		this.skip();
	}
});

// Copyright (C) 2015 André Bargull. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
description: >
  Math.clz32.length is 1.
info: >
  Math.clz32 ( x )

  17 ECMAScript Standard Built-in Objects:
    Every built-in Function object, including constructors, has a length
    property whose value is an integer. Unless otherwise specified, this
    value is equal to the largest number of named arguments shown in the
    subclause headings for the function description, including optional
    parameters. However, rest parameters shown using the form “...name”
    are not included in the default argument count.

    Unless otherwise specified, the length property of a built-in Function
    object has the attributes { [[Writable]]: false, [[Enumerable]]: false,
    [[Configurable]]: true }.
includes: [propertyHelper.js]
---*/

it('should have length 1', function() {
	proclaim.equal(Math.clz32.length, 1);
});

// This test is not important to pass for a polyfill
xit('should have length as non-enumerable', function() {
	if (supportsGetOwnPropertyDescriptor) {
		var descr = Object.getOwnPropertyDescriptor(Math.clz32, 'length');
		var expected = {
				enumerable: false,
				configurable: true,
				value: 1,
				writable: false
		};

		proclaim.deepEqual(descr, expected);
	} else {
		this.skip();
	}
});


// Copyright (C) 2016 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
esid: sec-math.clz32
description: >
  Return 32 if x is Infinity or -Infinity
info: |
  Math.clz32 ( x )

  1. Let n be ToUint32(x).
  2. Let p be the number of leading zero bits in the 32-bit binary representation of n.
  3. Return p.

  7.1.6 ToUint32 ( argument )

  [...]
  2. If number is NaN, +0, -0, +∞, or -∞, return +0.
  [...]
---*/

it('should return 32 if x is Infinity or -Infinity', function() {
	proclaim.equal(Math.clz32(Infinity), 32);
	proclaim.equal(Math.clz32(-Infinity), 32);
});


// Copyright (C) 2016 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
esid: sec-math.clz32
description: >
  Catches the int32bit value in the ToUint32 operation
info: |
  Math.clz32 ( x )

  1. Let n be ToUint32(x).
  2. Let p be the number of leading zero bits in the 32-bit binary representation of n.
  3. Return p.

  7.1.6 ToUint32 ( argument )

  [...]
  3. Let int be the mathematical value that is the same sign as number and whose
  magnitude is floor(abs(number)).
  4. Let int32bit be int modulo 232.
  5. Return int32bit.
  [...]
---*/

it('catches the int32bit value in the ToUint32 operation', function() {
	proclaim.equal(Math.clz32(4294967295), 0);
	proclaim.equal(Math.clz32(4294967296), 32);
	proclaim.equal(Math.clz32(4294967297), 31);

	proclaim.equal(Math.clz32(65535), 16);
	proclaim.equal(Math.clz32(65536), 15);
	proclaim.equal(Math.clz32(65537), 15);

	proclaim.equal(Math.clz32(255), 24);
	proclaim.equal(Math.clz32(256), 23);
	proclaim.equal(Math.clz32(257), 23);

	proclaim.equal(Math.clz32(-4294967295), 31);
	proclaim.equal(Math.clz32(-4294967296), 32);
	proclaim.equal(Math.clz32(-4294967297), 0);

	proclaim.equal(Math.clz32(-65535), 0);
	proclaim.equal(Math.clz32(-65536), 0);
	proclaim.equal(Math.clz32(-65537), 0);

	proclaim.equal(Math.clz32(-255), 0);
	proclaim.equal(Math.clz32(-256), 0);
	proclaim.equal(Math.clz32(-257), 0);
});
