(function(){
	'use strict';

	function toObject(value) {
		if (value == null) {
			throw new TypeError('Cannot call method on ' + value);
		}
		return Object(value);
	}
	function toLength(argument) {
		var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
		var number = Number(argument);
		if (isNaN(number)) {
			number = 0;
		}
		var len = (number >= 0 ? 1 : -1) * Math.floor(Math.abs(number));
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	}
	function isCallable(value) {
		return typeof value !== 'function' && typeof value !== 'object';
	};
	function isString (value) {
		return typeof value === 'string';
	}

	var parseIterable = function (iterator) {
		var done = false;
		var iterableResponse;
		var tempArray = [];

		if (iterator && typeof iterator.next === 'function') {
			while (!done) {
				iterableResponse = iterator.next();
				if (
					iterableResponse.hasOwnProperty('value')
					&& iterableResponse.hasOwnProperty('done')
				) {
					if (iterableResponse.done === true) {
						done = true;
						break; // eslint-disable-line no-restricted-syntax

					} else if (iterableResponse.done !== false) {
						break; // eslint-disable-line no-restricted-syntax
					}

					tempArray.push(iterableResponse.value);
				} else if (iterableResponse.done === true) {
					done = true;
					break; // eslint-disable-line no-restricted-syntax
				} else {
					break; // eslint-disable-line no-restricted-syntax
				}
			}
		}

		return done ? tempArray : false;
	};

	var hasSymbols = 'Symbol' in this && 'iterator' in Symbol;
	var iteratorSymbol;
	var forOf;
	var hasSet = !!this.Set && isCallable(Set.prototype.values);
	var hasMap = !!this.Map && isCallable(Map.prototype.entries);

	if (hasSymbols) {
		iteratorSymbol = Symbol.iterator;
	} else {
		var supportsStrIterator = (function () {
			try {
				var supported = false;
				var obj = { // eslint-disable-line no-unused-vars
					'@@iterator': function () {
						return {
							'next': function () {
								supported = true;
								return {
									'done': true,
									'value': undefined
								};
							}
						};
					}
				};

				Function('obj', // eslint-disable-line no-new-func
					'for (var x of obj) {}'
				)(obj);
				return supported;
			} catch (e) {
				return false;
			}
		}());

		if (supportsStrIterator) {
			iteratorSymbol = '@@iterator';
		} else {
			try {
				if (Function('var s = new Set(); s.add(0); for (var x of s) return x;')() === 0) { // eslint-disable-line no-new-func
					forOf = Function('iterable', 'var arr = []; for (var value of iterable) arr.push(value); return arr;'); // eslint-disable-line no-new-func
				}
			} catch (e) {
			}
		}
	}

	var isSet;
	if (hasSet) {
		var setSize = Object.getOwnPropertyDescriptor(Set.prototype, 'size').get;
		isSet = function (set) {
			try {
				setSize.call(set);
				return true;
			} catch (e) {
				return false;
			}
		};
	}

	var isMap;
	if (hasMap) {
		var mapSize = Object.getOwnPropertyDescriptor(Map.prototype, 'size').get;
		isMap = function (m) {
			try {
				mapSize.call(m);
				return true;
			} catch (e) {
				return false;
			}
		};
	}

	var setValues = hasSet && Set.prototype.values;
	var mapEntries = hasMap && Map.prototype.entries;
	var usingIterator = function (items) {
		if (items.hasOwnProperty(iteratorSymbol)) {
			return items[iteratorSymbol]();
		} else if (hasSet && isSet(items)) {
			return setValues.call(items);
		} else if (hasMap && isMap(items)) {
			return mapEntries.call(items);
		}
		return items;
	};

	var strMatch = String.prototype.match;

	var parseIterableLike = function (items) {
		var arr = parseIterable(usingIterator(items));

		if (!arr) {
			if (forOf) {
				// Safari 8's native Map or Set can't be iterated except with for..of
				arr = forOf(items);
			} else if (isString(items)) {
				arr = strMatch.call(items, /[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
			}
		}
		return arr || items;
	};

	/*! https://mths.be/array-from v0.2.0 by @mathias */
	Array.prototype.from = function from(items) {
		var defineProperty = Object.defineProperty;
		var C = this;
		if (items === null || typeof items === 'undefined') {
			throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
		}
		var mapFn, T;
		if (typeof arguments[1] !== 'undefined') {
			mapFn = arguments[1];
			if (!isCallable(mapFn)) {
				throw new TypeError('When provided, the second argument to `Array.from` must be a function');
			}
			if (arguments.length > 2) {
				T = arguments[2];
			}
		}

		var arrayLike = toObject(parseIterableLike(items));
		var len = toLength(arrayLike.length);
		var A = isCallable(C) ? toObject(new C(len)) : new Array(len);
		var k = 0;
		var kValue, mappedValue;

		while (k < len) {
			kValue = arrayLike[k];
			if (mapFn) {
				mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.apply(T, [kValue, k]);
			} else {
				mappedValue = kValue;
			}
			defineProperty(A, k, {
				'configurable': true,
				'enumerable': true,
				'value': mappedValue,
				'writable': true
			});
			k += 1;
		}
		A.length = len;
		return A;
	};
}());
