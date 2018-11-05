(function (global) {
	var spaces = /\s+/;

	function checkIfEmptyString(operation, token) {
		if (token === "") {
			var error = new DOMException("Failed to execute '" + operation + "' on 'DOMTokenList': The token provided must not be empty.");
			error.code = 12;
			error.name = "SYNTAX_ERR";
			throw error;
		}
	}

	function checkIfStringContainsWhitespace(operation, token) {
		if (spaces.test(token)) {
			var error = new DOMException("Failed to execute '" + operation + "' on 'DOMTokenList': " + "The token provided ('" + token + "') contains HTML space characters, which are not valid in tokens.");
			error.code = 5;
			error.name = "InvalidCharacterError";
			throw error;
		}
	}

	var nativeImpl;
	if ("DOMTokenList" in global) {
		if (document.createElement) {
			var span = document.createElement("span");
			if (span.classList instanceof DOMTokenList) {
				span.className = 'a a b';
				if (span.classList.length === 2) {
					var DOMTokenListConstructor = span.classList.constructor;
					if ('length' in DOMTokenListConstructor.prototype) {
						nativeImpl = DOMTokenListConstructor;
					}
				}
			}
		}
	}

	if (nativeImpl) {
		// Add second argument to native DOMTokenList.toggle() if necessary
		(function () {
			var e = document.createElement('span');
			if ('classList' in e) {
				e.classList.toggle('x', false);
				if (e.classList.contains('x')) {
					e.classList.constructor.prototype.toggle = function toggle(token /*, force*/ ) {
						var force = arguments[1];
						if (this.contains(token)) {
							if (!force) {
								// force is not true (either false or omitted)
								this.remove(token);
							}
						} else if (force === undefined || force) {
							force = true;
							this.add(token);
						}
						return !!force;
					};
				}
			}
		}());

		// Add multiple arguments to native DOMTokenList.add() if necessary
		(function () {
			var e = document.createElement('span');
			if ('classList' in e) {
				e.classList.add('a', 'b');
				if (!e.classList.contains('b')) {
					var originalAdd = e.classList.constructor.prototype.add;
					e.classList.constructor.prototype.add = function add() {
						var args = arguments;
						var l = arguments.length;
						for (var i = 0; i < l; i++) {
							originalAdd.call(this, args[i]);
						}
					};
				}
			}
		}());

		// Add multiple arguments to native DOMTokenList.remove() if necessary
		(function () {
			var e = document.createElement('span');
			if ('classList' in e) {
				e.classList.add('a');
				e.classList.add('b');
				e.classList.remove('a', 'b');
				if (e.classList.contains('b')) {
					var originalRemove = e.classList.constructor.prototype.remove;
					e.classList.constructor.prototype.remove = function () {
						var args = arguments;
						var l = arguments.length;
						for (var i = 0; i < l; i++) {
							originalRemove.call(this, args[i]);
						}
					};
				}
			}
		}());

		// Add DOMTokenList.value if necessary
		(function () {
			var e = document.createElement('span');
			if ('classList' in e) {
				if (!('value' in e.classList)) {
					var DOMTokenList = e.classList.constructor;
					// tokenlist . value
					// Returns the associated set as string.
					// Can be set, to change the associated attribute.
					// https://dom.spec.whatwg.org/#dom-domtokenlist-value
					Object.defineProperty(DOMTokenList.prototype, "value", {
						get: function () {
							return (this._node.getAttribute(this._attr) || "");
						},
						set: function (value) {
							var currentTokens = (this._node.getAttribute(this._attr) || "").trim().split(spaces);
							currentTokens = currentTokens.map(function (token) {
								return token.trim();
							});
							currentTokens = currentTokens.filter(function (token, index) {
								return token !== "" && currentTokens.indexOf(token) === index;
							});
							this.remove.apply(this, currentTokens);
							var newTokens = String(value).trim().split(spaces);
							newTokens = newTokens.map(function (token) {
								return token.trim();
							});
							newTokens = newTokens.filter(function (token, index) {
								return token !== "" && newTokens.indexOf(token) === index;
							});
							this.add.apply(this, newTokens);
						}
					});
				}
			}
		}());

		// Add DOMTokenList.replace if necessary
		(function () {
			var e = document.createElement('span');
			if ('classList' in e) {
				if (!('replace' in e.classList)) {
					var DOMTokenList = e.classList.constructor;
					DOMTokenList.prototype.replace = function replace(token, newToken) {
						// 1. If either token or newToken is the empty string, then throw a "SyntaxError" DOMException.
						checkIfEmptyString("replace", token);
						checkIfEmptyString("replace", newToken);
						// 2. If either token or newToken contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
						checkIfStringContainsWhitespace("replace", token);
						checkIfStringContainsWhitespace("replace", newToken);

						// 3. If context object’s token set does not contain token, then return false.
						if (!this.contains(token)) {
							return false;
						}
						// 4. Replace token in context object’s token set with newToken.
						this.remove(token);
						// 5. Run the update steps.
						// Polyfill.io. The update steps are done as part of adding the token.
						this.add(newToken);
						// 6. Return true.
						return true;
					};
				}
			}
		}());
	} else {
		global.DOMTokenList = (function () {
			'use strict';

			var dpSupport = true;
			/** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
			try {
				Object.defineProperty({}, "support", {
					configurable: false,
					get: function () {},
					set: function () {}
				});
			} catch (e) {
				dpSupport = false;
			}

			/*
			interface DOMTokenList {
				readonly attribute unsigned long length;
				getter DOMString? item(unsigned long index);
				boolean contains(DOMString token);
				void add(DOMString... tokens);
				void remove(DOMString... tokens);
				boolean toggle(DOMString token, optional boolean force);
				boolean replace(DOMString token, DOMString newToken);
				boolean supports(DOMString token);
				stringifier attribute DOMString value;
				iterable<DOMString>;
			  };
			*/
			function DOMTokenList( /*node, attr*/ ) {
				var node = arguments[0];
				var attr = arguments[1];
				this._attr = attr;
				this._node = node;

				var value = node.getAttribute(attr);
				if (value) {
					value = value.trim();
				}
				if (value && value.length) {
					var newTokens = value.split(spaces);
					newTokens = newTokens.map(function (token) {
						return token.trim();
					});
					newTokens = newTokens.filter(function (token, index) {
						return token !== "" && newTokens.indexOf(token) === index;
					});
					Array.prototype.push.apply(this, newTokens);
				}
			};

			// tokenlist . length
			// Returns the number of tokens.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-length
			// The length attribute' getter must return context object’s token set’s size.
			// Polyfill.io - Because of the array-like nature of DOMTokenList, we use the Array.prototype methods for controlling the state of a DOMTokenList. The Array.prototype methods update the length property automatically.
			DOMTokenList.prototype.length = 0;

			// tokenlist . add(tokens…)
			// Adds all arguments passed, except those already present.
			// Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
			// Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-add
			DOMTokenList.prototype.add = function add( /* tokens */ ) {
				// 1. For each token in tokens:
				var tokens = arguments;
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					// 1.1 If token is the empty string, then throw a "SyntaxError" DOMException.
					checkIfEmptyString("add", token);
					// 1.2 If token contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
					checkIfStringContainsWhitespace("add", token);
				}
				// 2. For each token in tokens, append token to context object’s token set.
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					if (!this.contains(token)) {
						Array.prototype.push.call(this, token);
					}
				}
				// 3. Run the update steps.
				this._node.setAttribute(this._attr, Array.prototype.join.call(this, ' '));
			};

			// tokenlist . contains(token)
			// Returns true if token is present, and false otherwise.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-contains
			DOMTokenList.prototype.contains = function contains(token) {
				return -1 < Array.prototype.indexOf.call(this, token);
			};

			// tokenlist . item(index)
			// tokenlist[index]
			// Returns the token with index index.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-item
			DOMTokenList.prototype.item = function item(index) {
				// 1. If index is equal to or greater than context object’s token set’s size, then return null.
				if (index >= this.length) {
					return null;
				}
				// Polyfill.io - If the number is negative, it will always be null.
				if (index < 0) {
					return null;
				}
				// 2. Return context object’s token set[index].
				return Array.prototype.slice.call(this, index, index + 1) || null;
			};

			// tokenlist . remove(tokens…)
			// Removes arguments passed, if they are present.
			// Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
			// Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-remove
			DOMTokenList.prototype.remove = function remove( /* tokens */ ) {
				var tokens = arguments;
				// 1. For each token in tokens:
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					// 1.1. If token is the empty string, then throw a "SyntaxError" DOMException.
					checkIfEmptyString("remove", token);
					// 1.2. If token contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
					checkIfStringContainsWhitespace("remove", token);
				}
				// 2. For each token in tokens, remove token from context object’s token set.
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					if (this.contains(token)) {
						var index = Array.prototype.indexOf.call(this, token);
						Array.prototype.splice.call(this, index, 1);
					}
				}
				// 3. Run the update steps.
				this._node.setAttribute(this._attr, Array.prototype.join.call(this, ' '));
			};

			// tokenlist . replace(token, newToken)
			// Replaces token with newToken.
			// Returns true if token was replaced with newToken, and false otherwise.
			// Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
			// Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-replace
			DOMTokenList.prototype.replace = function replace(token, newToken) {
				// 1. If either token or newToken is the empty string, then throw a "SyntaxError" DOMException.
				checkIfEmptyString("replace", token);
				checkIfEmptyString("replace", newToken);
				// 2. If either token or newToken contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
				checkIfStringContainsWhitespace("replace", token);
				checkIfStringContainsWhitespace("replace", newToken);

				// 3. If context object’s token set does not contain token, then return false.
				if (!this.contains(token)) {
					return false;
				}
				// 4. Replace token in context object’s token set with newToken.
				this.remove(token);
				this.add(newToken);
				// 5. Run the update steps.
				// 6. Return true.
				return true;
			};

			// tokenlist . toggle(token [, force])	
			// If force is not given, "toggles" token, removing it if it’s present and adding it if it’s not present. If force is true, adds token (same as add()). If force is false, removes token (same as remove()).
			// Returns true if token is now present, and false otherwise.
			// Throws a "SyntaxError" DOMException if token is empty.
			// Throws an "InvalidCharacterError" DOMException if token contains any spaces.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-toggle
			DOMTokenList.prototype.toggle = function toggle(token /*, force*/ ) {
				// 1. If token is the empty string, then throw a "SyntaxError" DOMException.
				checkIfEmptyString("toggle", token);
				// 2. If token contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
				checkIfStringContainsWhitespace("toggle", token);

				var force = arguments[1];
				// 3. If context object’s token set[token] exists, then:
				if (this.contains(token)) {
					// 3.1. If force is either not given or is false, then remove token from context object’s token set, run the update steps and return false.
					if (!force) {
						this.remove(token);
						return false;
					}
					// 3.2. Return true.
					return true;
				} else {
					// 4. Otherwise, if force not given or is true, append token to context object’s token set, run the update steps, and return true.
					if (force === undefined || force) {
						this.add(token);
						return true;
					}
					// 5. Return false.
					return false;
				}
			};

			DOMTokenList.prototype.toString = DOMTokenList.prototype.toLocaleString = function toString() {
				return this._node.getAttribute(this._attr) || "";
			};

			DOMTokenList.prototype.toLocaleString = function toLocaleString() {
				return this._node.getAttribute(this._attr) || "";
			};

			// tokenlist . supports(token)
			// Returns true if token is in the associated attribute’s supported tokens. Returns false otherwise.
			// Throws a TypeError if the associated attribute has no supported tokens defined.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-supports
			DOMTokenList.prototype.supports = function supports( /* token*/ ) {
				// 1. Let result be the return value of validation steps called with token.
				// 2. Return result.
				return false;
			};

			// tokenlist . value
			// Returns the associated set as string.
			// Can be set, to change the associated attribute.
			// https://dom.spec.whatwg.org/#dom-domtokenlist-value
			if (dpSupport) {
				Object.defineProperty(DOMTokenList.prototype, "value", {
					get: function () {
						return this._node.getAttribute(this._attr) || "";
					},
					set: function (value) {
						Array.prototype.splice.call(this, 0);
						this._node.setAttribute(this._attr, value);
						var value = this._node.getAttribute(this._attr);
						if (value) {
							value = value.trim();
						}
						if (value && value.length) {
							var newTokens = value.split(spaces).map(function (token) {
								return token.trim();
							});
							newTokens = newTokens.filter(function (token, index) {
								return token !== "" && newTokens.indexOf(token) === index;
							});
							Array.prototype.push.apply(this, newTokens);
						}
					}
				});
			}
			return DOMTokenList;
		}(window));
	}
}(this));
