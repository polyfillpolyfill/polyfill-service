// A modification of https://github.com/medikoo/es6-iterator
// Copyright (C) 2013-2015 Mariusz Nowak (www.medikoo.com)

/* global Symbol */

var ArrayIterator = (function() {
	var Iterator = (function() {
		var clear = function() {
			this.length = 0;
			return this;
		};
		var callable = function(fn) {
			if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
			return fn;
		};
		var autoBind = function(name, desc) {
			var value = desc && desc.value;
			var dgs = Object.assign({}, desc);
			delete dgs.writable;
			delete dgs.value;
			dgs.get = function() {
				if (Object.prototype.hasOwnProperty.call(this, name)) return value;
				desc.value = Function.prototype.bind.call(value, this);
				Object.defineProperty(this, name, desc);
				return this[name];
			};
			return dgs;
		};

		var Iterator = function(list, context) {
			if (!(this instanceof Iterator)) {
				return new Iterator(list, context);
			}
			Object.defineProperties(this, {
				__list__: {
					writable: true,
					value: list
				},
				__context__: {
					writable: true,
					value: context
				},
				__nextIndex__: {
					writable: true,
					value: 0
				}
			});
			if (!context) return;
			callable(context.on);
			context.on('_add', this._onAdd);
			context.on('_delete', this._onDelete);
			context.on('_clear', this._onClear);
		};

		Object.defineProperties(Iterator.prototype, Object.assign({
			constructor: {
				value: Iterator,
				configurable: true,
				enumerable: false,
				writable: true
			},
			_next: {
				value: function() {
					var i;
					if (!this.__list__) return;
					if (this.__redo__) {
						i = this.__redo__.shift();
						if (i !== undefined) return i;
					}
					if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
					this._unBind();
				},
				configurable: true,
				enumerable: false,
				writable: true
			},
			next: {
				value: function() {
					return this._createResult(this._next());
				},
				configurable: true,
				enumerable: false,
				writable: true
			},
			_createResult: {
				value: function(i) {
					if (i === undefined) return {
						done: true,
						value: undefined
					};
					return {
						done: false,
						value: this._resolve(i)
					};
				},
				configurable: true,
				enumerable: false,
				writable: true
			},
			_resolve: {
				value: function(i) {
					return this.__list__[i];
				},
				configurable: true,
				enumerable: false,
				writable: true
			},
			_unBind: {
				value: function() {
					this.__list__ = null;
					delete this.__redo__;
					if (!this.__context__) return;
					this.__context__.off('_add', this._onAdd);
					this.__context__.off('_delete', this._onDelete);
					this.__context__.off('_clear', this._onClear);
					this.__context__ = null;
				},
				configurable: true,
				enumerable: false,
				writable: true
			},
			toString: {
				value: function() {
					return '[object Iterator]';
				},
				configurable: true,
				enumerable: false,
				writable: true
			}
		}, {
			_onAdd: autoBind('_onAdd', {
				value: function(index) {
					if (index >= this.__nextIndex__) return;
					++this.__nextIndex__;
					if (!this.__redo__) {
						Object.defineProperty(this, '__redo__', {
							value: [index],
							configurable: true,
							enumerable: false,
							writable: false
						});
						return;
					}
					this.__redo__.forEach(function(redo, i) {
						if (redo >= index) this.__redo__[i] = ++redo;
					}, this);
					this.__redo__.push(index);
				},
				configurable: true,
				enumerable: false,
				writable: true
			}),
			_onDelete: autoBind('_onDelete', {
				value: function(index) {
					var i;
					if (index >= this.__nextIndex__) return;
					--this.__nextIndex__;
					if (!this.__redo__) return;
					i = this.__redo__.indexOf(index);
					if (i !== -1) this.__redo__.splice(i, 1);
					this.__redo__.forEach(function(redo, i) {
						if (redo > index) this.__redo__[i] = --redo;
					}, this);
				},
				configurable: true,
				enumerable: false,
				writable: true
			}),
			_onClear: autoBind('_onClear', {
				value: function() {
					if (this.__redo__) clear.call(this.__redo__);
					this.__nextIndex__ = 0;
				},
				configurable: true,
				enumerable: false,
				writable: true
			})
		}));

		Object.defineProperty(Iterator.prototype, Symbol.iterator, {
			value: function() {
				return this;
			},
			configurable: true,
			enumerable: false,
			writable: true
		});
		Object.defineProperty(Iterator.prototype, Symbol.toStringTag, {
			value: 'Iterator',
			configurable: false,
			enumerable: false,
			writable: false
		});

		return Iterator;
	}());


	var ArrayIterator = function(arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';
		else if (String.prototype.contains.call(kind, 'key+value')) kind = 'key+value';
		else if (String.prototype.contains.call(kind, 'key')) kind = 'key';
		else kind = 'value';
		Object.defineProperty(this, '__kind__', {
			value: kind,
			configurable: false,
			enumerable: false,
			writable: false
		});
	};
	if (Object.setPrototypeOf) Object.setPrototypeOf(ArrayIterator, Iterator);

	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: {
			value: ArrayIterator,
			configurable: true,
			enumerable: false,
			writable: true
		},
		_resolve: {
			value: function(i) {
				if (this.__kind__ === 'value') return this.__list__[i];
				if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
				return i;
			},
			configurable: true,
			enumerable: false,
			writable: true
		},
		toString: {
			value: function() {
				return '[object Array Iterator]';
			},
			configurable: true,
			enumerable: false,
			writable: true
		}
	});

	return ArrayIterator;
}());
