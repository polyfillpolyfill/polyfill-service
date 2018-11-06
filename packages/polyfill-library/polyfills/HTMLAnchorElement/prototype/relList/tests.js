/* eslint-env mocha, browser */
/* global proclaim */
testsForDOMTokenListInterface(HTMLAnchorElement, function() {
	return document.createElement('a');
}, 'relList', 'rel');

function testsForDOMTokenListInterface(constructor, elementFactory, domTokenListPropertyName, localname) {
	var hasGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
	describe('(getter)', function () {
		it('returns a DOMTokenList instance', function () {
			var element = elementFactory();
			var dtl = element[domTokenListPropertyName];
			proclaim.isInstanceOf(dtl, DOMTokenList);
			proclaim.equal(dtl.constructor, DOMTokenList);
			proclaim.hasName(dtl.constructor, "DOMTokenList");
			if ("__proto__" in {}) {
				proclaim.equal(dtl.__proto__ === DOMTokenList.prototype, true);
			}
		});
		describe('length', function () {
			it('is 0 if element has no classes', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 0);
			});
			it('is 1 if element has 1 class', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 1);
			});
			it('is the amount of unique classes that the element has', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 2);
			});
		});
		describe('item(index)', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.item);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.item, 1);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.item, 'item');
			});
			it('returns null if no tokens are in the DOMTokenList instance', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isNull(dtl.item(0));
			});
			it('returns null if given a negative number', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isNull(dtl.item(-1));
			});
			it('returns the token at the index position', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a a b c');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.item(0), 'a');
				proclaim.equal(dtl.item(1), 'b');
				proclaim.equal(dtl.item(2), 'c');
			});
		});
		describe('[index]', function () {
			it('returns undefined if no tokens are in the DOMTokenList instance', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isUndefined(dtl[0]);
			});
			it('returns the token at the index position', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a a b c');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl[0], 'a');
				proclaim.equal(dtl[1], 'b');
				proclaim.equal(dtl[2], 'c');
			});
		});
		describe('contains(token)', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.contains);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.contains, 1);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.contains, 'contains');
			});
			it('returns true if the token is present in the DOMTokenList instance', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.isTrue(dtl.contains('a'));
			});
			it('returns false if the token is not present in the DOMTokenList instance', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.isFalse(dtl.contains('b'));
			});
		});
		describe('add(tokens...)', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.add);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.add, 0);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.add, 'add');
			});
			it('throws a SyntaxError if called with an empty string', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.add("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.add("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.add(" ");
				});
				proclaim.throws(function () {
					dtl.add("\ta");
				});
				proclaim.throws(function () {
					dtl.add("a\t");
				});
				proclaim.throws(function () {
					dtl.add("\na");
				});
				proclaim.throws(function () {
					dtl.add("a\n");
				});
				proclaim.throws(function () {
					dtl.add("\fa");
				});
				proclaim.throws(function () {
					dtl.add("a\f");
				});
				proclaim.throws(function () {
					dtl.add("\ra");
				});
				proclaim.throws(function () {
					dtl.add("a\r");
				});
				proclaim.throws(function () {
					dtl.add(" a");
				});
				proclaim.throws(function () {
					dtl.add("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.add("a", " ");
				});
				proclaim.throws(function () {
					dtl.add("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are added to the DOMTokenList instance', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 0);
				proclaim.throws(function () {
					dtl.add('a', 'b', '');
				});
				proclaim.equal(dtl.length, 0);
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are added to the DOMTokenList instance', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 0);
				proclaim.throws(function () {
					dtl.add('a', 'b', ' ');
				});
				proclaim.equal(dtl.length, 0);
			});
			it('adds the token to the DOMTokenList instance and onto the corresponding attribute', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				element.setAttribute(localname, '');
				proclaim.equal(dtl.length, 0);
				dtl.add('a');
				proclaim.equal(dtl.length, 1);
				proclaim.equal(element.getAttribute(localname), 'a');
			});
			it('does not add the token if it already exists', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 1);
				dtl.add('a');
				proclaim.equal(dtl.length, 1);
				proclaim.equal(element.getAttribute(localname), 'a');
			});
			it('adds multiple tokens to the DOMTokenList instance and onto the corresponding attribute', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				element.setAttribute(localname, '');
				proclaim.equal(dtl.length, 0);
				dtl.add('a', 'b', 'c', 'd', 'a');
				proclaim.equal(dtl.length, 4);
				proclaim.equal(element.getAttribute(localname), 'a b c d');
			});
			it('returns undefined', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isUndefined(dtl.add('a'));
			});
		});
		describe('remove(tokens...)', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.remove);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.remove, 0);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.remove, 'remove');
			});
			it('throws a SyntaxError if called with an empty string', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.remove("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.remove("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.remove(" ");
				});
				proclaim.throws(function () {
					dtl.remove("\ta");
				});
				proclaim.throws(function () {
					dtl.remove("a\t");
				});
				proclaim.throws(function () {
					dtl.remove("\na");
				});
				proclaim.throws(function () {
					dtl.remove("a\n");
				});
				proclaim.throws(function () {
					dtl.remove("\fa");
				});
				proclaim.throws(function () {
					dtl.remove("a\f");
				});
				proclaim.throws(function () {
					dtl.remove("\ra");
				});
				proclaim.throws(function () {
					dtl.remove("a\r");
				});
				proclaim.throws(function () {
					dtl.remove(" a");
				});
				proclaim.throws(function () {
					dtl.remove("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.remove("a", " ");
				});
				proclaim.throws(function () {
					dtl.remove("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are removed from the DOMTokenList instance', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 2);
				proclaim.throws(function () {
					dtl.remove('a', 'b', '');
				});
				proclaim.equal(dtl.length, 2);
				proclaim.equal(element.getAttribute(localname), 'a b');
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are removed from the DOMTokenList instance', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 2);
				proclaim.throws(function () {
					dtl.remove('a', 'b', ' ');
				});
				proclaim.equal(dtl.length, 2);
			});
			it('removes the token from the DOMTokenList instance and the corresponding attribute', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 1);
				dtl.remove('a');
				proclaim.equal(dtl.length, 0);
				proclaim.equal(element.getAttribute(localname), '');
			});
			it('removes multiple tokens from the DOMTokenList instance and the corresponding attribute', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b c d');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.length, 4);
				dtl.remove('a', 'b');
				proclaim.equal(dtl.length, 2);
				proclaim.equal(element.getAttribute(localname), 'c d');
			});
			it('returns undefined', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isUndefined(dtl.remove('a'));
			});
		});
		describe('toggle(token [, force])', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.toggle);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.toggle, 1);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.toggle, 'toggle');
			});
			it('throws a SyntaxError if called with an empty string', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.toggle("");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.toggle(" ");
				});
				proclaim.throws(function () {
					dtl.toggle("\ta");
				});
				proclaim.throws(function () {
					dtl.toggle("a\t");
				});
				proclaim.throws(function () {
					dtl.toggle("\na");
				});
				proclaim.throws(function () {
					dtl.toggle("a\n");
				});
				proclaim.throws(function () {
					dtl.toggle("\fa");
				});
				proclaim.throws(function () {
					dtl.toggle("a\f");
				});
				proclaim.throws(function () {
					dtl.toggle("\ra");
				});
				proclaim.throws(function () {
					dtl.toggle("a\r");
				});
				proclaim.throws(function () {
					dtl.toggle(" a");
				});
				proclaim.throws(function () {
					dtl.toggle("a ");
				});
			});
			it('if token exists, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.isFalse(dtl.toggle('a'));
				proclaim.equal(element.getAttribute(localname), 'b');
				proclaim.equal(dtl.length, 1);
			});
			it('if token exists and force argument is `false`, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.isFalse(dtl.toggle('a', false));
				proclaim.equal(element.getAttribute(localname), 'b');
				proclaim.equal(dtl.length, 1);
			});
			it('if token exists and force argument is `true`, it does not remove the token and returns `true`', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a b');
				var dtl = element[domTokenListPropertyName];
				proclaim.isTrue(dtl.toggle('a', true));
				proclaim.equal(element.getAttribute(localname), 'a b');
				proclaim.equal(dtl.length, 2);
			});
			it('if token does not exist, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isTrue(dtl.toggle('a'));
				proclaim.equal(element.getAttribute(localname), 'a');
				proclaim.equal(dtl.length, 1);
			});
			it('if token does not exist and force argument is `true`, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isTrue(dtl.toggle('a', true));
				proclaim.equal(element.getAttribute(localname), 'a');
				proclaim.equal(dtl.length, 1);
			});
			it('if token does not exist and force argument is `false`, it does not modify the DOMTokenList instance or the corresponding attribute and returns `false`', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFalse(dtl.toggle('a', false));
				proclaim.isNull(element.getAttribute(localname));
				proclaim.equal(dtl.length, 0);
			});
		});
		describe('replace(token, newToken)', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.replace);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.replace, 2);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.replace, 'replace');
			});
			it('throws a SyntaxError if token is an empty string', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.replace("", "b");
				});
			});
			it('throws a SyntaxError if newToken is an empty string', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.replace("a", "");
				});
			});
			it('throws a InvalidCharacterError if token contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.replace(" ", "b");
				});
				proclaim.throws(function () {
					dtl.replace("\ta", "b");
				});
				proclaim.throws(function () {
					dtl.replace("a\t", "b");
				});
				proclaim.throws(function () {
					dtl.replace("\na", "b");
				});
				proclaim.throws(function () {
					dtl.replace("a\n", "b");
				});
				proclaim.throws(function () {
					dtl.replace("\fa", "b");
				});
				proclaim.throws(function () {
					dtl.replace("a\f", "b");
				});
				proclaim.throws(function () {
					dtl.replace("\ra", "b");
				});
				proclaim.throws(function () {
					dtl.replace("a\r", "b");
				});
				proclaim.throws(function () {
					dtl.replace(" a", "b");
				});
				proclaim.throws(function () {
					dtl.replace("a ", "b");
				});
			});
			it('throws a InvalidCharacterError if newToken contains ASCII whitespace', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.throws(function () {
					dtl.replace("a", " ");
				});
				proclaim.throws(function () {
					dtl.replace("a", "\ta");
				});
				proclaim.throws(function () {
					dtl.replace("a", "a\t");
				});
				proclaim.throws(function () {
					dtl.replace("a", "\na");
				});
				proclaim.throws(function () {
					dtl.replace("a", "a\n");
				});
				proclaim.throws(function () {
					dtl.replace("a", "\fa");
				});
				proclaim.throws(function () {
					dtl.replace("a", "a\f");
				});
				proclaim.throws(function () {
					dtl.replace("a", "\ra");
				});
				proclaim.throws(function () {
					dtl.replace("a", "a\r");
				});
				proclaim.throws(function () {
					dtl.replace("a", " a");
				});
				proclaim.throws(function () {
					dtl.replace("a", "a ");
				});
			});
			it('if given token does not exist in the DOMTokenList instance, return `false`', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFalse(dtl.replace("a", "b"));
			});
			it('if given token does not in the DOMTokenList instance, replace it with `newToken` and return `true`', function () {
				var element = elementFactory();
				element.setAttribute(localname, 'a');
				var dtl = element[domTokenListPropertyName];
				proclaim.isTrue(dtl.replace("a", "b"));
				proclaim.equal(element.getAttribute(localname), 'b');
				proclaim.equal(dtl.length, 1);
			});
		});
		// describe('supports(token)', function(){
		// 	it('is a function', function() {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.isFunction(dtl.supports);
		// 	});
		// 	it('has correct arity', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.arity(dtl.supports, 1);
		// 	});
		// 	it('has correct name', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.hasName(dtl.supports, 'supports');
		// 	});
		// });
		describe('toString()', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.toString);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.toString, 0);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.toString, 'toString');
			});
			it('should return the literal value of the corresponding attribute', function () {
				var element = elementFactory();
				element.setAttribute(localname, ' a  ');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.toString(), element.getAttribute(localname));
			});
		});
		describe('toLocaleString()', function () {
			it('is a function', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.isFunction(dtl.toLocaleString);
			});
			it('has correct arity', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.arity(dtl.toLocaleString, 0);
			});
			it('has correct name', function () {
				var element = elementFactory();
				var dtl = element[domTokenListPropertyName];
				proclaim.hasName(dtl.toLocaleString, 'toLocaleString');
			});
			it('should return the literal value of the corresponding attribute', function () {
				var element = elementFactory();
				element.setAttribute(localname, ' a  ');
				var dtl = element[domTokenListPropertyName];
				proclaim.equal(dtl.toLocaleString(), element.getAttribute(localname));
			});
		});
		// describe('entries()', function(){
		// 	it('is a function', function() {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.isFunction(dtl.entries);
		// 	});
		// 	it('has correct arity', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.arity(dtl.entries, 1);
		// 	});

		// 	it('has correct name', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.hasName(dtl.entries, 'entries');
		// 	});
		// });
		// describe('forEach()', function(){
		// 	it('is a function', function() {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.isFunction(dtl.forEach);
		// 	});
		// 	it('has correct arity', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.arity(dtl.forEach, 1);
		// 	});

		// 	it('has correct name', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.hasName(dtl.forEach, 'forEach');
		// 	});
		// });
		// describe('keys()', function(){
		// 	it('is a function', function() {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.isFunction(dtl.keys);
		// 	});
		// 	it('has correct arity', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.arity(dtl.keys, 1);
		// 	});

		// 	it('has correct name', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.hasName(dtl.keys, 'keys');
		// 	});
		// });
		// describe('values()', function(){
		// 	it('is a function', function() {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.isFunction(dtl.values);
		// 	});
		// 	it('has correct arity', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.arity(dtl.values, 1);
		// 	});

		// 	it('has correct name', function () {
		// 		var element = elementFactory();
		// 		var dtl = element[domTokenListPropertyName];
		// 		proclaim.hasName(dtl.values, 'values');
		// 	});
		// });

		describe('value', function () {
			if (hasGetOwnPropertyDescriptor) {
				it('has a getter function', function () {
					var element = elementFactory();
					var dtl = element[domTokenListPropertyName];
					var descriptor = Object.getOwnPropertyDescriptor(dtl.constructor.prototype, 'value');
					proclaim.isFunction(descriptor.get);
				});
				it('has a setter function', function () {
					var element = elementFactory();
					var dtl = element[domTokenListPropertyName];
					var descriptor = Object.getOwnPropertyDescriptor(dtl.constructor.prototype, 'value');
					proclaim.isFunction(descriptor.set);
				});
			}
			describe('(getter)', function () {
				it('should return the literal value of the corresponding attribute', function () {
					var element = elementFactory();
					element.setAttribute(localname, ' a  ');
					var dtl = element[domTokenListPropertyName];
					proclaim.equal(dtl.value, element.getAttribute(localname));
				});
			});
			describe('(setter)', function () {
				it('should assign the value being set to the corresponding attribute', function () {
					var element = elementFactory();
					var dtl = element[domTokenListPropertyName];
					dtl.value = ' b  ';
					proclaim.equal(dtl.value, ' b  ');
					proclaim.equal(dtl.value, element.getAttribute(localname));
				});
				it('should update the DOMTokenList instance with the new length and tokens', function () {
					var element = elementFactory();
					var dtl = element[domTokenListPropertyName];
					dtl.value = 'a a b';
					proclaim.equal(dtl.length, 2);
					proclaim.isTrue(dtl.contains('a'));
					proclaim.isTrue(dtl.contains('b'));
				});
			});
		});
	});
	describe('(setter)', function () {
		it('updates the element\'s corresponding attribute', function () {
			it('should assign the value being set to the corresponding attribute', function () {
				var element = elementFactory();
				element[domTokenListPropertyName] = ' b  ';
				proclaim.equal(element[domTokenListPropertyName][0], 'b');
				proclaim.equal(element[domTokenListPropertyName].value, element.getAttribute(localname));
			});
			it('should update the DOMTokenList instance with the new length and tokens', function () {
				var element = elementFactory();
				element[domTokenListPropertyName] = 'a a b';
				proclaim.equal(element[domTokenListPropertyName].length, 2);
				proclaim.isTrue(element[domTokenListPropertyName].contains('a'));
				proclaim.isTrue(element[domTokenListPropertyName].contains('b'));
			});
		});
	});
}
