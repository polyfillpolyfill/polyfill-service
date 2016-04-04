var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-constructor
it('should throw if being used via `new`', function() {
	var test = function () {
		return new Symbol();
	}
	expect(test).to.throwError();
});

it('should have Symbol as the constructor property', function() {
	expect(Symbol().constructor).to.be(Symbol)
});

it('should silently fail when assigning new properties', function (){
	var a = Symbol("1");
	a.b = '1';
	expect(a.b).to.be.undefined;
});

// A tough one right now
xit('should have Symbol.prototype as the prototype of an instance', function() {
	expect(Object.getPrototypeOf(Symbol())).to.be(Symbol.prototype);
});

it('should return "[object Symbol]" when called with Object.prototype.toString()', function() {
	expect(Object.prototype.toString.call(Symbol())).to.be('[object Symbol]');
});

if (supportsDescriptors) {
	it('should silently fail when overwriting properties', function() {
		var sym = Symbol("2");
		sym.toString = 0;
		expect(sym.toString).to.be.a(Function)
		sym.valueOf = 0;
		expect(sym.valueOf).to.be.a(Function)
	});
}

it('should create unique symbols', function() {
	expect(Symbol("3")).to.not.equal(Symbol("3"))
});

it('has for, and keyFor static methods', function() {
	expect(Symbol["for"]).to.be.a(Function);
	expect(Symbol.keyFor).to.be.a(Function);
});

it('Symbol.keyFor should throw if not given a symbol', function() {
	var stringKeyFor = function() {
		return Symbol.keyFor('a');
	}
	var numberKeyFor = function() {
		return Symbol.keyFor(1);
	}
	var arrayKeyFor = function() {
		return Symbol.keyFor([]);
	}
	var objectKeyFor = function() {
		return Symbol.keyFor({});
	}
	var boolKeyFor = function() {
		return Symbol.keyFor(true);
	}
	var undefinedKeyFor = function() {
		return Symbol.keyFor(undefined);
	}
	var symbolKeyFor = function() {
		return Symbol.keyFor(Symbol("4"));
	}

	expect(stringKeyFor).to.throwError();
	expect(numberKeyFor).to.throwError();
	expect(arrayKeyFor).to.throwError();
	expect(objectKeyFor).to.throwError();
	expect(boolKeyFor).to.throwError();
	expect(undefinedKeyFor).to.throwError();
	expect(symbolKeyFor).to.not.throwError();
});

it('Symbol.keyFor should return undefined if can not find symbol in global registry', function() {
	expect(Symbol.keyFor(Symbol("5"))).to.be.undefined;
});

it('Symbol() should not add the symbol to the global registry', function() {
	var sym = Symbol("6");
	expect(Symbol.keyFor(sym)).to.be.undefined;
});

it('Symbol["for"] should create new symbol if can not find symbol in global registry', function() {
	var sym1 = Symbol("7");
	var sym2 = Symbol["for"]("7");
	expect(sym1).to.not.equal(sym2);
});

it('Symbol["for"] should return symbol if can find symbol in global registry', function() {
	var sym = Symbol["for"]("8");
	expect(sym).to.equal(Symbol["for"]("8"));
});

it('Symbol.keyFor should return key of symbol if can find symbol in global registry', function() {
	var key = "9"
	var sym = Symbol["for"](key);
	expect(Symbol.keyFor(sym)).to.be(key);
});

it('has toString and valueOf instance methods', function() {
	expect(Symbol.prototype['toString']).to.be.a(Function);
	expect(Symbol.prototype['valueOf']).to.be.a(Function);
});

if (supportsDescriptors) {
	// https://kangax.github.io/compat-table/es6/#Symbol_symbol_keys_are_hidden_to_pre-ES6_code
	it('should make symbols non-enumerable', function() {
		var object = {};
		var symbol = Symbol();
		object[symbol] = 1;

		for (var x in object){}
		var passed = !x;

		expect(passed).to.be(true);
		expect(Object.keys(object).length).to.be(0);
		expect(Object.getOwnPropertyNames(object).length).to.be(0);
	});
}

// Not really possible on a polyfill
xit('should perform correctly with toString operations', function() {
	expect(String(Symbol('10'))).to.be('Symbol(10)');
	expect(Symbol('10').toString()).to.be('Symbol(10)');
	expect(Object(Symbol('10')).toString()).to.be('Symbol(10)');
	expect(Symbol.prototype.toString.call(Symbol('10'))).to.be('Symbol(10)');
});

// Not really possible on a polyfill
xit('should not allow implicit string coercion', function() {
	var implicitStringCoercion = function() {
		return Symbol('10') + '';
	}
	expect(implicitStringCoercion).to.throwError();
});
