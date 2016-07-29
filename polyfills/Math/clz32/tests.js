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
	expect(Math.clz32(0)).to.equal(32);
	expect(Math.clz32(-0)).to.equal(32);
});

// Copyright (c) 2014 Ryan Lewis. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
author: Ryan Lewis
description: Math.clz32 should return 31 if passed 1.
---*/

it('should return 31 if passed 1', function() {
	expect(Math.clz32(1)).to.equal(31);
});


// Copyright (c) 2014 Ryan Lewis. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.11
author: Ryan Lewis
description: Math.clz32 should return 0 if passed 2147483648
---*/

it('should return 0 if passed 2147483648', function() {
	expect(Math.clz32(2147483648)).to.equal(0);
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
	expect(Math.clz32(NaN)).to.equal(32);
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
		expect(Math.clz32.name).to.equal('clz32');
	} else {
		this.skip();
	}
});

it('should have name as non-enumerable', function() {
	if (functionsHaveNames && supportsGetOwnPropertyDescriptor) {
		var descr = Object.getOwnPropertyDescriptor(Math.clz32, 'name');
		var expected = {
				enumerable: false,
				configurable: true,
				value: 'clz32',
				writable: false
		};

		expect(descr).to.eql(expected);
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
	expect(Math.clz32.length).to.equal(1);
});

it('should have length as non-enumerable', function() {
	if (supportsGetOwnPropertyDescriptor) {
		var descr = Object.getOwnPropertyDescriptor(Math.clz32, 'length');
		var expected = {
				enumerable: false,
				configurable: true,
				value: 1,
				writable: false
		};

		expect(descr).to.eql(expected);
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
	expect(Math.clz32(Infinity)).to.equal(32);
	expect(Math.clz32(-Infinity)).to.equal(32);
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
	expect(Math.clz32(4294967295)).to.equal(0);
	expect(Math.clz32(4294967296)).to.equal(32);
	expect(Math.clz32(4294967297)).to.equal(31);

	expect(Math.clz32(65535)).to.equal(16);
	expect(Math.clz32(65536)).to.equal(15);
	expect(Math.clz32(65537)).to.equal(15);

	expect(Math.clz32(255)).to.equal(24);
	expect(Math.clz32(256)).to.equal(23);
	expect(Math.clz32(257)).to.equal(23);

	expect(Math.clz32(-4294967295)).to.equal(31);
	expect(Math.clz32(-4294967296)).to.equal(32);
	expect(Math.clz32(-4294967297)).to.equal(0);

	expect(Math.clz32(-65535)).to.equal(0);
	expect(Math.clz32(-65536)).to.equal(0);
	expect(Math.clz32(-65537)).to.equal(0);

	expect(Math.clz32(-255)).to.equal(0);
	expect(Math.clz32(-256)).to.equal(0);
	expect(Math.clz32(-257)).to.equal(0);
});
