// A modification of https://github.com/WebReflection/get-own-property-symbols
// (C) Andrea Giammarchi - MIT Licensed

(function (G) {
	'use strict';
	var setDescriptor;
	var id = 0;
	var random = '' + Math.random();
	var prefix = '__\x01symbol:';
	var prefixLength = prefix.length;
	var internalSymbol = '__\x01symbol@@' + random;
	var gOPN = Object.getOwnPropertyNames;
	var create = Object.create;
	var keys = Object.keys;
	var descriptor = Object.getOwnPropertyDescriptor(Object, 'getOwnPropertyNames');
	var ObjectProto = Object.prototype;
	var hOP = ObjectProto.hasOwnProperty;
	var addInternalIfNeeded = function (o, uid, enumerable) {
		if (!hOP.call(o, internalSymbol)) {
			Object.defineProperty(o, internalSymbol, {
				enumerable: false,
				configurable: false,
				writable: false,
				value: {}
			});
		}
		o[internalSymbol]['@@' + uid] = enumerable;
	};
	var copyAsNonEnumerable = function (descriptor) {
		var newDescriptor = create(descriptor);
		newDescriptor.enumerable = false;
		return newDescriptor;
	};
	var get = function get(){};
	var onlyNonSymbols = function (name) {
		return  name != internalSymbol && !hOP.call(source, name);
	};
	var onlySymbols = function (name) {
		return  name != internalSymbol && hOP.call(source, name);
	};
	var propertyIsEnumerable = function propertyIsEnumerable(key) {
		var uid = '' + key;
		return onlySymbols(uid) ? (
			hOP.call(this, uid) &&
			this[internalSymbol]['@@' + uid]
		) : ObjectProto.propertyIsEnumerable.call(this, key);
	};
	var setAndGetSymbol = function (uid) {
		var descriptor = {
			enumerable: false,
			configurable: true,
			get: get,
			set: function (value) {
				setDescriptor(this, uid, {
					enumerable: false,
					configurable: true,
					writable: true,
					value: value
				});
				addInternalIfNeeded(this, uid, true);
			}
		};
		Object.defineProperty(ObjectProto, uid, descriptor);
		return Object.freeze(source[uid] = Object.defineProperty(
			Object(uid),
			'constructor',
			sourceConstructor
		));
	};
	var Symbol = function Symbol(description) {
			if (this && this !== G) {
				throw new TypeError('Symbol is not a constructor');
			}
		return setAndGetSymbol(
			prefix.concat(description || '', random, ++id)
		);
	};
	var source = create(null);
	var sourceConstructor = {value: Symbol};
	var $defineProperty = function defineProp(o, key, descriptor) {
		var uid = '' + key;
		if (onlySymbols(uid)) {
			setDescriptor(o, uid, descriptor.enumerable ?
				copyAsNonEnumerable(descriptor) : descriptor);
			addInternalIfNeeded(o, uid, !!descriptor.enumerable);
		} else {
			Object.defineProperty(o, key, descriptor);
		}
		return o;
	};

	descriptor.value = function getOwnPropertyNames(o) {
		return gOPN(o).filter(onlyNonSymbols);
	};
	Object.defineProperty(Object, 'getOwnPropertyNames', descriptor);

	descriptor.value = Symbol;
	Object.defineProperty(G, 'Symbol', descriptor);

	// defining `Symbol.for(key)`
	descriptor.value = function (key) {
		var uid = prefix.concat(prefix, key, random);
		return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
	};
	Object.defineProperty(Symbol, 'for', descriptor);

	// defining `Symbol.keyFor(symbol)`
	descriptor.value = function (symbol) {
		if (Object.prototype.toString.call(symbol) !== "[object Symbol]") {
			throw new TypeError(symbol + ' is not a symbol');
		}
		return hOP.call(source, symbol) ? symbol.slice(prefixLength * 2, -random.length) : void 0;
	};
	Object.defineProperty(Symbol, 'keyFor', descriptor);

	// Overriding Object.prototype.toString to make it detect Symbols correctly
	descriptor.value = function () {
		var str = toString.call(this);
		return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
	};
	Object.defineProperty(ObjectProto, 'toString', descriptor);

	try { // fails in few pre ES 5.1 engines
		setDescriptor = create(
			Object.defineProperty(
				{},
				prefix,
				{
					get: function () {
						return Object.defineProperty(this, prefix, {value: false})[prefix];
					}
				}
			)
		)[prefix] || defineProperty;
	} catch(o_O) {
		setDescriptor = function (o, key, descriptor) {
			var protoDescriptor = Object.getOwnPropertyDescriptor(ObjectProto, key);
			delete ObjectProto[key];
			Object.defineProperty(o, key, descriptor);
			Object.defineProperty(ObjectProto, key, protoDescriptor);
		};
	}
}(typeof global === typeof G ? window : global));
