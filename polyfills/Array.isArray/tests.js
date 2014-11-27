it('has correct instance', function () {
	expect(Array.isArray).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(Array.isArray)).to.be('isArray');
});

it('has correct argument length', function () {
	expect(Array.isArray.length).to.be(1);
});

describe('returns true with', function () {
	it('arrays', function () {
		expect(Array.isArray(new Array)).to.be(true);
		expect(Array.isArray(new Array(10))).to.be(true);
		expect(Array.isArray([])).to.be(true);
		expect(Array.isArray(['a', 'b', 'c'])).to.be(true);
	});
});

describe('returns false with', function () {
	it('empty, null, or undefined', function () {
		expect(Array.isArray()).to.be(false);
		expect(Array.isArray(undefined)).to.be(false);
		expect(Array.isArray(null)).to.be(false);
	});

	it('arguments', function () {
		var args = (function () {
			return arguments;
		})('a', 'b', 'c');

		expect(Array.isArray(args)).to.be(false);
	});

	it('primatives', function () {
		expect(Array.isArray(true)).to.be(false);
		expect(Array.isArray('abc')).to.be(false);
		expect(Array.isArray(123)).to.be(false);
	});

	it('instances', function () {
		expect(Array.isArray(new Date)).to.be(false);
		expect(Array.isArray(new Object)).to.be(false);
		expect(Array.isArray(new Function)).to.be(false);
		expect(Array.isArray(new Number)).to.be(false);
		expect(Array.isArray(new String)).to.be(false);
	});

	it('constructors', function () {
		expect(Array.isArray(Math)).to.be(false);
		expect(Array.isArray(Object)).to.be(false);
		expect(Array.isArray(Number)).to.be(false);
		expect(Array.isArray(String)).to.be(false);
	});

	it('objects', function () {
		expect(Array.isArray({})).to.be(false);
		expect(Array.isArray({
			0: 'a',
			1: 'b',
			2: 'c',
			length: 3
		})).to.be(false);
	});

	it('objects as array subclasses', function () {
		function NotArray() {}

		NotArray.prototype = new Array;

		expect(Array.isArray(new NotArray)).to.be(false);
	});

	it('functions', function () {
		expect(Array.isArray(function () {
			return [];
		})).to.be(false);
	});

	it('regular expressions', function () {
		expect(Array.isArray(/abc/)).to.be(false);
	});
});

describe('Test 262: 15.4.3.2', function () {
    function runTestCase(fn) {
        expect(fn()).to.be.ok();
    }

    var fnGlobalObject = (function () {
        var __globalObject = Function("return this;")();
        return function fnGlobalObject() {
             return __globalObject;
        };
    }());

	specify('15.4.3.2-0-1', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-1
		description: Array.isArray must exist as a function
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  var f = Array.isArray;
		  if (typeof(f) === "function") {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-0-2', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-2
		description: Array.isArray must exist as a function taking 1 parameter
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  if (Array.isArray.length === 1) {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-0-3', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-3
		description: Array.isArray return true if its argument is an Array
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  var a = [];
		  var b = Array.isArray(a);
		  if (b === true) {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-0-4', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-4
		description: Array.isArray return false if its argument is not an Array
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  var b_num   = Array.isArray(42);
		  var b_undef = Array.isArray(undefined);
		  var b_bool  = Array.isArray(true);
		  var b_str   = Array.isArray("abc");
		  var b_obj   = Array.isArray({});
		  var b_null  = Array.isArray(null);
		  
		  if (b_num === false &&
		      b_undef === false &&
		      b_bool === false &&
		      b_str === false &&
		      b_obj === false &&
		      b_null === false) {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
    /*
    Test 15.4.3.2-0-5 ignored: imposes conditions on Array.prototype
    */
	specify('15.4.3.2-0-6', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-6
		description: Array.isArray return true if its argument is an Array (new Array())
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  var a = new Array(10);
		  var b = Array.isArray(a);
		  if (b === true) {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-0-7', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-0-7
		description: Array.isArray returns false if its argument is not an Array
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		  var o = new Object();
		  o[12] = 13;
		  var b = Array.isArray(o);
		  if (b === false) {
		    return true;
		  }
		 }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-1', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-1
		description: Array.isArray applied to boolean primitive
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(true);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-10', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-10
		description: Array.isArray applied to RegExp object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new RegExp());
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-11', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-11
		description: Array.isArray applied to the JSON object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(JSON);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-12', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-12
		description: Array.isArray applied to Error object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new SyntaxError());
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-13', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-13
		description: Array.isArray applied to Arguments object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        var arg;
		
		        (function fun() {
		            arg = arguments;
		        }(1, 2, 3));
		
		        return !Array.isArray(arg);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-15', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-15
		description: Array.isArray applied to the global object
		includes:
		    - runTestCase.js
		    - fnGlobalObject.js
		---*/
		
		function testcase() {
		
		        return !Array.isArray(fnGlobalObject());
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-2', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-2
		description: Array.isArray applied to Boolean Object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new Boolean(false));
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-3', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-3
		description: Array.isArray applied to number primitive
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(5);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-4', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-4
		description: Array.isArray applied to Number object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new Number(-3));
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-5', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-5
		description: Array.isArray applied to string primitive
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray("abc");
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-6', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-6
		description: Array.isArray applied to String object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new String("hello\nworld\\!"));
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-7', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-7
		description: Array.isArray applied to Function object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(function () { });
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-8', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-8
		description: Array.isArray applied to the Math object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(Math);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-1-9', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-1-9
		description: Array.isArray applied to Date object
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray(new Date());
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-2-1', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-2-1
		description: Array.isArray applied to an object with an array as the prototype
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        var proto = [];
		        var Con = function () { };
		        Con.prototype = proto;
		
		        var child = new Con();
		        return !Array.isArray(child);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-2-2', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-2-2
		description: >
		    Array.isArray applied to an object with Array.prototype as the
		    prototype
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        var proto = Array.prototype;
		        var Con = function () { };
		        Con.prototype = proto;
		
		        var child = new Con();
		
		        return !Array.isArray(child);
		    }
		runTestCase(testcase);
		
	});
	specify('15.4.3.2-2-3', function () {
		// Copyright (c) 2012 Ecma International.  All rights reserved.
		// Ecma International makes this code available under the terms and conditions set
		// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
		// "Use Terms").   Any redistribution of this code must retain the above
		// copyright and this notice and otherwise comply with the Use Terms.
		
		/*---
		es5id: 15.4.3.2-2-3
		description: >
		    Array.isArray applied to an Array-like object with length and some
		    indexed properties
		includes: [runTestCase.js]
		---*/
		
		function testcase() {
		
		        return !Array.isArray({ 0: 12, 1: 9, length: 2 });
		    }
		runTestCase(testcase);
		
	});
});
