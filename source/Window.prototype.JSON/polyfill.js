(function () {
	var
	toString = Object.prototype.toString,
	hasOwnProperty = Object.prototype.hasOwnProperty,
	LEFT_CURLY = '{',
	RIGHT_CURLY = '}',
	COLON = ':',
	LEFT_BRACE = '[',
	RIGHT_BRACE = ']',
	COMMA = ',',
	tokenType = {
		PUNCTUATOR: 1,
		STRING: 2,
		NUMBER: 3,
		BOOLEAN: 4,
		NULL: 5
	},
	tokenMap = {
		'{': 1, '}': 1, '[': 1, ']': 1, ',': 1, ':': 1,
		'"': 2,
		't': 4, 'f': 4,
		'n': 5
	},
	escChars = {
		'b': '\b',
		'f': '\f',
		'n': '\n',
		'r': '\r',
		't': '\t',
		'"': '"',
		'\\': '\\',
		'/': '/'
	},
	tokenizer = /^(?:[{}:,\[\]]|true|false|null|"(?:[^"\\\u0000-\u001F]|\\["\\\/bfnrt]|\\u[0-9A-F]{4})*"|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/,
	whiteSpace = /^[\t ]+/,
	lineTerminator = /^\r?\n/;

	function JSONLexer(JSONStr) {
		this.line = 1;
		this.col = 1;
		this._tokLen = 0;
		this._str = JSONStr;
	}

	JSONLexer.prototype = {
		getNextToken: function () {
			var
			str = this._str,
			token, type;

			this.col += this._tokLen;

			if (!str.length) {
				return 'END';
			}

			token = tokenizer.exec(str);

			if (token) {
				type = tokenMap[token[0].charAt(0)] || tokenType.NUMBER;
			} else if ((token = whiteSpace.exec(str))) {
				this._tokLen = token[0].length;
				this._str = str.slice(this._tokLen);
				return this.getNextToken();
			} else if ((token = lineTerminator.exec(str))) {
				this._tokLen = 0;
				this._str = str.slice(token[0].length);
				this.line++;
				this.col = 1;
				return this.getNextToken();
			} else {
				this.error('Invalid token');
			}

			this._tokLen = token[0].length;
			this._str = str.slice(this._tokLen);

			return {
				type: type,
				value: token[0]
			};
		},

		error: function (message, line, col) {
			var err = new SyntaxError(message);

			err.line = line || this.line;
			err.col = col || this.col;

			throw err;
		}
	};

	function JSONParser(lexer) {
		this.lex = lexer;
	}

	JSONParser.prototype = {
		parse: function () {
			var lex = this.lex, jsValue = this.getValue();

			if (lex.getNextToken() !== 'END') {
				lex.error('Illegal token');
			}

			return jsValue;
		},
		getObject: function () {
			var
			jsObj = {},
			lex = this.lex,
			token, tval, prop,
			line, col,
			pairs = false;

			while (true) {
				token = lex.getNextToken();
				tval = token.value;

				if (tval === RIGHT_CURLY) {
					return jsObj;
				}

				if (pairs) {
					if (tval === COMMA) {
						line = lex.line;
						col = lex.col - 1;
						token = lex.getNextToken();
						tval = token.value;
						if (tval === RIGHT_CURLY) {
							lex.error('Invalid trailing comma', line, col);
						}
					}
					else {
						lex.error('Illegal token where expect comma or right curly bracket');
					}
				}
				else if (tval === COMMA) {
					lex.error('Invalid leading comma');
				}

				if (token.type != tokenType.STRING) {
					lex.error('Illegal token where expect string property name');
				}

				prop = this.getString(tval);

				token = lex.getNextToken();
				tval = token.value;

				if (tval != COLON) {
					lex.error('Illegal token where expect colon');
				}

				jsObj[prop] = this.getValue();
				pairs = true;
			}
		},
		getArray: function () {
			var
			jsArr = [],
			lex = this.lex,
			token, tval,
			line, col,
			values = false;

			while (true) {
				token = lex.getNextToken();
				tval = token.value;

				if (tval === RIGHT_BRACE) {
					return jsArr;
				}

				if (values) {
					if (tval === COMMA) {
						line = lex.line;
						col = lex.col - 1;
						token = lex.getNextToken();
						tval = token.value;

						if (tval === RIGHT_BRACE) {
							lex.error('Invalid trailing comma', line, col);
						}
					} else {
						lex.error('Illegal token where expect comma or right square bracket');
					}
				} else if (tval === COMMA) {
					lex.error('Invalid leading comma');
				}

				jsArr.push(this.getValue(token));
				values = true;
			}
		},
		getString: function (strVal) {
			return strVal.slice(1, -1).replace(/\\u?([0-9A-F]{4}|["\\\/bfnrt])/g, function (match, escVal) {
				return escChars[escVal] || String.fromCharCode(parseInt(escVal, 16));
			});
		},
		getValue: function(fromToken) {
			var lex = this.lex,
				token = fromToken || lex.getNextToken(),
				tval = token.value;
			switch (token.type) {
				case tokenType.PUNCTUATOR:
					if (tval === LEFT_CURLY) {
						return this.getObject();
					} else if (tval === LEFT_BRACE) {
						return this.getArray();
					}

					lex.error('Illegal punctoator');

					break;
				case tokenType.STRING:
					return this.getString(tval);
				case tokenType.NUMBER:
					return Number(tval);
				case tokenType.BOOLEAN:
					return tval === 'true';
				case tokenType.NULL:
					return null;
				default:
					lex.error('Invalid value');
			}
		}
	};

	function filter(base, prop, value) {
		if (typeof value === 'undefined') {
			delete base[prop];
			return;
		}
		base[prop] = value;
	}

	function walk(holder, name, rev) {
		var val = holder[name], i, len;

		if (toString.call(val).slice(8, -1) === 'Array') {
			for (i = 0, len = val.length; i < len; i++) {
				filter(val, i, walk(val, i, rev));
			}
		} else if (typeof val === 'object') {
			for (i in val) {
				if (hasOwnProperty.call(val, i)) {
					filter(val, i, walk(val, i, rev));
				}
			}
		}

		return rev.call(holder, name, val);
	}

	function pad(value, length) {
		value = String(value);

		return value.length >= length ? value : new Array(length - value.length + 1).join('0') + value;
	}

	Window.prototype.JSON = {
		parse: function (JSONStr, reviver) {
			var jsVal = new JSONParser(new JSONLexer(JSONStr)).parse();

			if (typeof reviver === 'function') {
				return walk({
					'': jsVal
				}, '', reviver);
			}

			return jsVal;
		},
		stringify: function () {
			var
			value = arguments[0],
			replacer = typeof arguments[1] === 'function' ? arguments[1] : null,
			space = arguments[2] || '',
			spaceSpace = space ? ' ' : '',
			spaceReturn = space ? '\n' : '',
			className = toString.call(value).slice(8, -1),
			array, key, hasKey, index, length, eachValue;

			if (value === null || className === 'Boolean' || className === 'Number') {
				return value;
			}

			if (className === 'Array') {
				array = [];

				for (length = value.length, index = 0, eachValue; index < length; ++index) {
					eachValue = replacer ? replacer(index, value[index]) : value[index];
					eachValue = this.stringify(eachValue, replacer, space);

					if (eachValue === undefined || eachValue === null) {
						eachValue = 'null';
					}

					array.push(eachValue);
				}

				return '[' + spaceReturn + array.join(',' + spaceReturn).replace(/^/mg, space) + spaceReturn + ']';
			}

			if (className === 'Date') {
				return '"' + value.getUTCFullYear() + '-' +
				pad(value.getUTCMonth() + 1, 2)     + '-' +
				pad(value.getUTCDate(), 2)          + 'T' +
				pad(value.getUTCHours(), 2)         + ':' +
				pad(value.getUTCMinutes(), 2)       + ':' +
				pad(value.getUTCSeconds(), 2)       + '.' +
				pad(value.getUTCMilliseconds(), 3)  + 'Z' + '"';
			}

			if (className === 'String') {
				return '"' + value.replace(/"/g, '\\"') + '"';
			}

			if (typeof value === 'object') {
				array = [];
				hasKey = false;

				for (key in value) {
					if (hasOwnProperty.call(value, key)) {
						eachValue = replacer ? replacer(key, value[key]) : value[key];
						eachValue = this.stringify(eachValue, replacer, space);

						if (eachValue !== undefined) {
							hasKey = true;

							array.push('"' + key + '":' + spaceSpace + eachValue);
						}
					}
				}

				if (!hasKey) {
					return '{}';
				} else {
					return '{' + spaceReturn + array.join(',' + spaceReturn).replace(/^/mg, space) + spaceReturn + '}';
				}
			}
		}
	};
})();
