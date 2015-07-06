// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-constructor
it('should throw if being used via `new`', function() {
	var test = function () {
		return new Symbol();
	}
	expect(test).to.throw(Error);
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
	expect(sym.toString).to.be.an.instanceof(Function)
	sym.valueOf = 0;
	expect(sym.valueOf).to.be.an.instanceof(Function)
});

it('should create unique symbols', function() {
	expect(Symbol('a').toString()).to.not.equal(Symbol('a').toString())
});

it('has for, and keyFor static methods', function() {
	expect(Symbol.for).to.be.an.instanceof(Function);
	expect(Symbol.keyFor).to.be.an.instanceof(Function);
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

	expect(stringKeyFor).to.throw(Error);
	expect(numberKeyFor).to.throw(Error);
	expect(arrayKeyFor).to.throw(Error);
	expect(objectKeyFor).to.throw(Error);
	expect(boolKeyFor).to.throw(Error);
	expect(undefinedKeyFor).to.throw(Error);
	expect(symbolKeyFor).to.not.throw(Error);
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
	expect(Symbol.prototype['toString']).to.be.an.instanceof(Function);
	expect(Symbol.prototype['valueOf']).to.be.an.instanceof(Function);
});

it('has the well known symbols as static properties on Symbol', function() {
	expect(Symbol.hasInstance).to.be.a('symbol');
	expect(Symbol.isConcatSpreadable).to.be.a('symbol');
	expect(Symbol.iterator).to.be.a('symbol');
	expect(Symbol.match).to.be.a('symbol');
	expect(Symbol.replace).to.be.a('symbol');
	expect(Symbol.search).to.be.a('symbol');
	expect(Symbol.species).to.be.a('symbol');
	expect(Symbol.split).to.be.a('symbol');
	expect(Symbol.toPrimitive).to.be.a('symbol');
	expect(Symbol.toStringTag).to.be.a('symbol');
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

