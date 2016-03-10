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
		return (source[uid] = Object.freeze(Object.defineProperty(
			Object(uid),
			'constructor',
			sourceConstructor
		)));
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

(function (O, S) {
	var dP = O.defineProperty;
	var toString = Object.prototype.toString;
	var toStringTag = 'toStringTag';
	var descriptor;
	[
		'iterator',           // A method returning the default iterator for an object. Used by for...of.
		'match',              // A method that matches against a string, also used to determine if an object may be used as a regular expression. Used by String.prototype.match().
		'replace',            // A method that replaces matched substrings of a string. Used by String.prototype.replace().
		'search',             // A method that returns the index within a string that matches the regular expression. Used by String.prototype.search().
		'split',              // A method that splits a string at the indices that match a regular expression. Used by String.prototype.split().
		'hasInstance',        // A method determining if a constructor object recognizes an object as its instance. Used by instanceof.
		'isConcatSpreadable', // A Boolean value indicating if an object should be flattened to its array elements. Used by Array.prototype.concat().
		'unscopables',        // An Array of string values that are property values. These are excluded from the with environment bindings of the associated objects.
		'species',            // A constructor function that is used to create derived objects.
		'toPrimitive',        // A method converting an object to a primitive value.
		toStringTag           // A string value used for the default description of an object. Used by Object.prototype.toString().
	].forEach(function (name) {
		if (!(name in Symbol)) {
			dP(Symbol, name, {value: Symbol(name)});
			switch (name) {
				case toStringTag:
				descriptor = O.getOwnPropertyDescriptor(Object.prototype, 'toString');
				descriptor.value = function () {
					var str = toString.call(this);
					var tst = this[Symbol.toStringTag];
					return typeof tst === 'undefined' ? str : ('[object ' + tst + ']');
				};
				dP(Object.prototype, 'toString', descriptor);
				break;
			}
		}
	});
}(Object, Symbol));
