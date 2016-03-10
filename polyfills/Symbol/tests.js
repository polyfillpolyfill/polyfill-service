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
	const a = Symbol("1");
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
	var sym = Symbol("2");
	sym.toString = 0;
	expect(sym.toString).to.be.a(Function)
	sym.valueOf = 0;
	expect(sym.valueOf).to.be.a(Function)
});

it('should create unique symbols', function() {
	expect(Symbol("3")).to.not.equal(Symbol("3"))
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

it('Symbol.for should create new symbol if can not find symbol in global registry', function() {
	var sym1 = Symbol("7");
	var sym2 = Symbol.for("7");
	expect(sym1).to.not.equal(sym2);
});

it('Symbol.for should return symbol if can find symbol in global registry', function() {
	var sym = Symbol.for("8");
	expect(sym).to.equal(Symbol.for("8"));
});

it('Symbol.keyFor should return key of symbol if can find symbol in global registry', function() {
	var key = "9"
	var sym = Symbol.for(key);
	expect(Symbol.keyFor(sym)).to.be(key);
});

it('has toString and valueOf instance methods', function() {
	expect(Symbol.prototype['toString']).to.be.a(Function);
	expect(Symbol.prototype['valueOf']).to.be.a(Function);
});

it('has the well known symbol hasInstance as static properties on Symbol', function() {
	expect(Symbol.hasInstance).to.not.be.undefined;
	const hasInstance = Symbol.hasInstance;
	Symbol.hasInstance = "nope";
	expect(Symbol.hasInstance).to.be(hasInstance);
});

it('has the well known symbol isConcatSpreadable as static properties on Symbol', function() {
	expect(Symbol.isConcatSpreadable).to.not.be.undefined;

	const isConcatSpreadable = Symbol.isConcatSpreadable;
	Symbol.isConcatSpreadable = "nope";
	expect(Symbol.isConcatSpreadable).to.be(isConcatSpreadable);
});

it('has the well known symbol iterator as static properties on Symbol', function() {
	expect(Symbol.iterator).to.not.be.undefined;

	const iterator = Symbol.iterator;
	Symbol.iterator = "nope";
	expect(Symbol.iterator).to.be(iterator);
});

it('has the well known symbol match as static properties on Symbol', function() {
	expect(Symbol.match).to.not.be.undefined;

	const match = Symbol.match;
	Symbol.match = "nope";
	expect(Symbol.match).to.be(match);
});

it('has the well known symbol replace as static properties on Symbol', function() {
	expect(Symbol.replace).to.not.be.undefined;

	const replace = Symbol.replace;
	Symbol.replace = "nope";
	expect(Symbol.replace).to.be(replace);
});

it('has the well known symbol search as static properties on Symbol', function() {
	expect(Symbol.search).to.not.be.undefined;

	const search = Symbol.search;
	Symbol.search = "nope";
	expect(Symbol.search).to.be(search);
});

it('has the well known symbol species as static properties on Symbol', function() {
	expect(Symbol.species).to.not.be.undefined;

	const species = Symbol.species;
	Symbol.species = "nope";
	expect(Symbol.species).to.be(species);
});

it('has the well known symbol split as static properties on Symbol', function() {
	expect(Symbol.split).to.not.be.undefined;

	const split = Symbol.split;
	Symbol.split = "nope";
	expect(Symbol.split).to.be(split);
});

it('has the well known symbol toPrimitive as static properties on Symbol', function() {
	expect(Symbol.toPrimitive).to.not.be.undefined;

	const toPrimitive = Symbol.toPrimitive;
	Symbol.toPrimitive = "nope";
	expect(Symbol.toPrimitive).to.be(toPrimitive);
});

it('has the well known symbol toStringTag as static properties on Symbol', function() {
	expect(Symbol.toStringTag).to.not.be.undefined;

	const toStringTag = Symbol.toStringTag;
	Symbol.toStringTag = "nope";
	expect(Symbol.toStringTag).to.be(toStringTag);
});

it('has the well known symbol unscopables as static properties on Symbol', function() {
	expect(Symbol.unscopables).to.not.be.undefined;

	const unscopables = Symbol.unscopables;
	Symbol.unscopables = "nope";
	expect(Symbol.unscopables).to.be(unscopables);
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

it('should perform correctly with toString operations', function() {
	expect(String(Symbol('10'))).to.be('Symbol(10)');
	expect(Symbol('10').toString()).to.be('Symbol(10)');
	expect(Object(Symbol('10')).toString()).to.be('Symbol(10)');
	expect(Symbol.prototype.toString.call(Symbol('10'))).to.be('Symbol(10)');
});


it('should not allow implicit string coercion', function() {
	var implicitStringCoercion = function() {
		return Symbol('10') + '';
	}
	expect(implicitStringCoercion).to.throwError();
});
