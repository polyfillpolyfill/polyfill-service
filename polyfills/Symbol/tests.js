// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-constructor
it('should throw if being used via `new`', function() {
	var test = function () {
		return new Symbol();
	}
	expect(test).to.throwError();
});

it('should have Symbol as the constructor property on the prototype', function() {
	expect(Object.getPrototypeOf(Symbol()).constructor).to.be(Symbol)
});

it('should silently fail when assigning new properties', function (){
	const a = Symbol('a');
	a.b = '1';
	expect(a.b).to.be.undefined;
});

it('should have Symbol.prototype as the prototype of an instance', function() {
	expect(Object.getPrototypeOf(Symbol())).to.be(Symbol.prototype);
});

it('should return "[object Symbol]" when called with Object.prototype.toString()', function() {
	expect(Object.prototype.toString.call(Symbol())).to.be('[object Symbol]');
});

it('should silently fail when overwriting properties', function() {
	var sym = Symbol('66');
	sym.toString = 0;
	expect(sym.toString).to.be.a(Function)
	sym.valueOf = 0;
	expect(sym.valueOf).to.be.a(Function)
});

it('should create unique symbols', function() {
	expect(Symbol('a')).to.not.equal(Symbol('a'))
});

it('has for, and keyFor static methods', function() {
	expect(Symbol.for).to.be.a(Function);
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
		return Symbol.keyFor(Symbol('a'));
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
	expect(Symbol.keyFor(Symbol('a'))).to.be.undefined;
});

it('Symbol() should not add the symbol to the global registry', function() {
	var sym = Symbol('a');
	expect(Symbol.keyFor(sym)).to.be.undefined;
});

it('Symbol.for should create new symbol if can not find symbol in global registry', function() {
	var sym1 = Symbol('a');
	var sym2 = Symbol.for('a');
	expect(sym1).to.not.equal(sym2);
});

it('Symbol.for should return symbol if can find symbol in global registry', function() {
	var sym = Symbol.for('a');
	expect(sym).to.equal(Symbol.for('a'));
});

it('Symbol.keyFor should return key of symbol if can find symbol in global registry', function() {
	var key = 'a'
	var sym = Symbol.for(key);
	expect(Symbol.keyFor(sym)).to.be(key);
});

it('has toString and valueOf instance methods', function() {
	expect(Symbol.prototype['toString']).to.be.a(Function);
	expect(Symbol.prototype['valueOf']).to.be.a(Function);
});

it('has the well known symbol hasInstance as static properties on Symbol', function() {
	expect(Symbol.hasInstance).to.be.a('symbol');
});

it('has the well known symbol isConcatSpreadable as static properties on Symbol', function() {
	expect(Symbol.isConcatSpreadable).to.be.a('symbol');
});

it('has the well known symbol iterator as static properties on Symbol', function() {
	expect(Symbol.iterator).to.be.a('symbol');
});

it('has the well known symbol match as static properties on Symbol', function() {
	expect(Symbol.match).to.be.a('symbol');
});

it('has the well known symbol replace as static properties on Symbol', function() {
	expect(Symbol.replace).to.be.a('symbol');
});

it('has the well known symbol search as static properties on Symbol', function() {
	expect(Symbol.search).to.be.a('symbol');
});

it('has the well known symbol species as static properties on Symbol', function() {
	expect(Symbol.species).to.be.a('symbol');
});

it('has the well known symbol split as static properties on Symbol', function() {
	expect(Symbol.split).to.be.a('symbol');
});

it('has the well known symbol toPrimitive as static properties on Symbol', function() {
	expect(Symbol.toPrimitive).to.be.a('symbol');
});

it('has the well known symbol toStringTag as static properties on Symbol', function() {
	expect(Symbol.toStringTag).to.be.a('symbol');
});

it('has the well known symbol unscopables as static properties on Symbol', function() {
	expect(Symbol.unscopables).to.be.a('symbol');
});


// https://kangax.github.io/compat-table/es6/#Symbol_symbol_keys_are_hidden_to_pre-ES6_code
it('should make symbols non-enumerable', function() {
	var object = {};
	var symbol = Symbol();
	object[symbol] = 1;

	for (var x in object){}
	var passed = !x;

	expect(passed).to.be.true;
	expect(Object.keys(object).length).to.be(0);
	expect(Object.getOwnPropertyNames(object).length).to.be(0);
});

