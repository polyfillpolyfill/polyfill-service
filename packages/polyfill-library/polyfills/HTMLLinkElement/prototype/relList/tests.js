/* eslint-env mocha, browser */
/* global proclaim */

describe('HTMLLinkElement.prototype.classList', function() {
	var hasGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
	if (hasGetOwnPropertyDescriptor) {
		it('has a getter function', function(){
			var descriptor = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'classList');
			proclaim.isFunction(descriptor.get);
		});
		it('has a setter function', function(){
			var descriptor = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'classList');
			proclaim.isFunction(descriptor.set);
		});
	}

	describe('(getter)', function() {
		it('returns a DOMTokenList instance', function() {
			var link = document.createElement('link');
			var classList = link.classList;
			proclaim.isInstanceOf(classList, DOMTokenList);
			proclaim.equal(classList.constructor, DOMTokenList);
			proclaim.equal(classList.constructor.name, "DOMTokenList");
			if ("__proto__" in {}) {
				proclaim.equal(classList.__proto__ === DOMTokenList.prototype, true);
			}
		});
		describe('length', function() {
			it('is 0 if element has no classes', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.equal(classList.length, 0);
			});
			it('is 1 if element has 1 classes', function(){
				var link = document.createElement('link');
				link.rel = 'a';
				var classList = link.classList;
				proclaim.equal(classList.length, 1);
			});
			it('is the amount of unique classes that the element has', function(){
				var link = document.createElement('link');
				link.rel = 'a a b';
				var classList = link.classList;
				proclaim.equal(classList.length, 2);
			});
			it('is read-only', function(){
				var link = document.createElement('link');
				link.rel = 'a';
				var classList = link.classList;
				classList.length = 4;
				proclaim.equal(classList.length, 1);
			});
		});
		describe('item(index)', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.item);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.item, 1);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.item, 'item');
			});
			it('returns null if no tokens are in the DOMTokenList instance', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isNull(classList.item(0));
			});
			it('returns null if given a negative number', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isNull(classList.item(-1));
			});
			it('returns the token at the index position', function() {
				var link = document.createElement('link');
				link.rel = 'a a b c';
				var classList = link.classList;
				proclaim.isNull(classList.item(0), 'a');
				proclaim.isNull(classList.item(1), 'b');
				proclaim.isNull(classList.item(2), 'c');
			});
		});
		describe('[index]', function(){
			it('returns undefined if no tokens are in the DOMTokenList instance', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isUndefined(classList[0]);
			});
			it('returns the token at the index position', function() {
				var link = document.createElement('link');
				link.rel = 'a a b c';
				var classList = link.classList;
				proclaim.isNull(classList[0], 'a');
				proclaim.isNull(classList[1], 'b');
				proclaim.isNull(classList[2], 'c');
			});
		});
		describe('contains(token)', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.contains);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.contains, 1);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.contains, 'contains');
			});
			it('returns true if the token is present in the DOMTokenList instance', function() {
				var link = document.createElement('link');
				link.rel = 'a';
				var classList = link.classList;
				proclaim.isTrue(classList.contains('a'));
			});
			it('returns false if the token is not present in the DOMTokenList instance', function() {
				var link = document.createElement('link');
				link.rel = 'a';
				var classList = link.classList;
				proclaim.isFalse(classList.contains('b'));
			});
		});
		describe('add(tokens...)', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.add);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.add, 0);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.add, 'add');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.add("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.add("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.add(" ");
				});
				proclaim.throws(function() {
					classList.add("\ta");
				});
				proclaim.throws(function() {
					classList.add("a\t");
				});
				proclaim.throws(function() {
					classList.add("\na");
				});
				proclaim.throws(function() {
					classList.add("a\n");
				});
				proclaim.throws(function() {
					classList.add("\fa");
				});
				proclaim.throws(function() {
					classList.add("a\f");
				});
				proclaim.throws(function() {
					classList.add("\ra");
				});
				proclaim.throws(function() {
					classList.add("a\r");
				});
				proclaim.throws(function() {
					classList.add(" a");
				});
				proclaim.throws(function() {
					classList.add("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.add("a", " ");
				});
				proclaim.throws(function() {
					classList.add("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are added to the DOMTokenList instance', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.equal(classList.length, 0);
				proclaim.throws(function() {
					classList.add('a','b','');
				});
				proclaim.equal(classList.length, 0);
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are added to the DOMTokenList instance', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.equal(classList.length, 0);
				proclaim.throws(function() {
					classList.add('a','b',' ');
				});
				proclaim.equal(classList.length, 0);
			});
			it('adds the token to the DOMTokenList instance and onto the corresponding attribute', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				link.rel = '';
				proclaim.equal(classList.length, 0);
				classList.add('a');
				proclaim.equal(classList.length, 1);
				proclaim.equal(link.rel, 'a');
			});
			it('does not add the token if it already exists', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				link.rel = 'a';
				proclaim.equal(classList.length, 0);
				classList.add('a');
				proclaim.equal(classList.length, 0);
				proclaim.equal(link.rel, 'a');
			});
			it('adds multiple tokens to the DOMTokenList instance and onto the corresponding attribute', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				link.rel = '';
				proclaim.equal(classList.length, 0);
				classList.add('a', 'b', 'c', 'd', 'a');
				proclaim.equal(classList.length, 4);
				proclaim.equal(link.rel, 'a b c d');
			});
			it('returns undefined', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isUndefined(classList.add('a'));
			});
		});
		describe('remove(tokens...)', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.remove);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.remove, 0);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.remove, 'remove');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.remove("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.remove("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.remove(" ");
				});
				proclaim.throws(function() {
					classList.remove("\ta");
				});
				proclaim.throws(function() {
					classList.remove("a\t");
				});
				proclaim.throws(function() {
					classList.remove("\na");
				});
				proclaim.throws(function() {
					classList.remove("a\n");
				});
				proclaim.throws(function() {
					classList.remove("\fa");
				});
				proclaim.throws(function() {
					classList.remove("a\f");
				});
				proclaim.throws(function() {
					classList.remove("\ra");
				});
				proclaim.throws(function() {
					classList.remove("a\r");
				});
				proclaim.throws(function() {
					classList.remove(" a");
				});
				proclaim.throws(function() {
					classList.remove("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.remove("a", " ");
				});
				proclaim.throws(function() {
					classList.remove("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are removed from the DOMTokenList instance', function() {
				var link = document.createElement('link');
				link.rel = 'a b';
				var classList = link.classList;
				proclaim.equal(classList.length, 2);
				proclaim.throws(function() {
					classList.remove('a','b','');
				});
				proclaim.equal(classList.length, 2);
				proclaim.equal(link.rel, 'a b');
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are removed from the DOMTokenList instance', function() {
				var link = document.createElement('link');
				link.rel = 'a b';
				var classList = link.classList;
				proclaim.equal(classList.length, 2);
				proclaim.throws(function() {
					classList.remove('a','b',' ');
				});
				proclaim.equal(classList.length, 2);
			});
			it('removes the token from the DOMTokenList instance and the corresponding attribute', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				link.rel = 'a';
				proclaim.equal(classList.length, 1);
				classList.remove('a');
				proclaim.equal(classList.length, 0);
				proclaim.equal(link.rel, '');
			});
			it('removes multiple tokens from the DOMTokenList instance and the corresponding attribute', function() {
				var link = document.createElement('link');
				link.rel = 'a b c d';
				var classList = link.classList;
				proclaim.equal(classList.length, 4);
				classList.remove('a', 'b');
				proclaim.equal(classList.length, 2);
				proclaim.equal(link.rel, 'c d');
			});
			it('returns undefined', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isUndefined(classList.remove('a'));
			});
		});
		describe('toggle(token [, force])', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.toggle);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.toggle, 1);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.toggle, 'toggle');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.toggle("");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.toggle(" ");
				});
				proclaim.throws(function() {
					classList.toggle("\ta");
				});
				proclaim.throws(function() {
					classList.toggle("a\t");
				});
				proclaim.throws(function() {
					classList.toggle("\na");
				});
				proclaim.throws(function() {
					classList.toggle("a\n");
				});
				proclaim.throws(function() {
					classList.toggle("\fa");
				});
				proclaim.throws(function() {
					classList.toggle("a\f");
				});
				proclaim.throws(function() {
					classList.toggle("\ra");
				});
				proclaim.throws(function() {
					classList.toggle("a\r");
				});
				proclaim.throws(function() {
					classList.toggle(" a");
				});
				proclaim.throws(function() {
					classList.toggle("a ");
				});
			});
			it('if token exists, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var link = document.createElement('link');
				link.rel = 'a b';
				var classList = link.classList;
				proclaim.isFalse(classList.toggle('a'));
				proclaim.equal(link.rel, 'b');
				proclaim.equal(classList.length, 1);
			});
			it('if token exists and force argument is `false`, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var link = document.createElement('link');
				link.rel = 'a b';
				var classList = link.classList;
				proclaim.isFalse(classList.toggle('a', false));
				proclaim.equal(link.rel, 'b');
				proclaim.equal(classList.length, 1);
			});
			it('if token exists and force argument is `true`, it does not remove the token and returns `true`', function(){
				var link = document.createElement('link');
				link.rel = 'a b';
				var classList = link.classList;
				proclaim.isTrue(classList.toggle('a', true));
				proclaim.equal(link.rel, 'a b');
				proclaim.equal(classList.length, 2);
			});
			it('if token does not exist, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isTrue(classList.toggle('a'));
				proclaim.equal(link.rel, 'a');
				proclaim.equal(classList.length, 1);
			});
			it('if token does not exist and force argument is `true`, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isTrue(classList.toggle('a', true));
				proclaim.equal(link.rel, 'a');
				proclaim.equal(classList.length, 1);
			});
			it('if token does not exist and force argument is `false`, it does not modify the DOMTokenList instance or the corresponding attribute and returns `false`', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isTrue(classList.toggle('a', false));
				proclaim.equal(link.rel, '');
				proclaim.equal(classList.length, 0);
			});
		});
		describe('replace(token, newToken)', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.replace);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.replace, 2);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.replace, 'replace');
			});
			it('throws a SyntaxError if token is an empty string', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.replace("", "b");
				});
			});
			it('throws a SyntaxError if newToken is an empty string', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.replace("a", "");
				});
			});
			it('throws a InvalidCharacterError if token contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.replace(" ", "b");
				});
				proclaim.throws(function() {
					classList.replace("\ta", "b");
				});
				proclaim.throws(function() {
					classList.replace("a\t", "b");
				});
				proclaim.throws(function() {
					classList.replace("\na", "b");
				});
				proclaim.throws(function() {
					classList.replace("a\n", "b");
				});
				proclaim.throws(function() {
					classList.replace("\fa", "b");
				});
				proclaim.throws(function() {
					classList.replace("a\f", "b");
				});
				proclaim.throws(function() {
					classList.replace("\ra", "b");
				});
				proclaim.throws(function() {
					classList.replace("a\r", "b");
				});
				proclaim.throws(function() {
					classList.replace(" a", "b");
				});
				proclaim.throws(function() {
					classList.replace("a ", "b");
				});
			});
			it('throws a InvalidCharacterError if newToken contains ASCII whitespace', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.throws(function() {
					classList.replace("a", " ");
				});
				proclaim.throws(function() {
					classList.replace("a", "\ta");
				});
				proclaim.throws(function() {
					classList.replace("a", "a\t");
				});
				proclaim.throws(function() {
					classList.replace("a", "\na");
				});
				proclaim.throws(function() {
					classList.replace("a", "a\n");
				});
				proclaim.throws(function() {
					classList.replace("a", "\fa");
				});
				proclaim.throws(function() {
					classList.replace("a", "a\f");
				});
				proclaim.throws(function() {
					classList.replace("a", "\ra");
				});
				proclaim.throws(function() {
					classList.replace("a", "a\r");
				});
				proclaim.throws(function() {
					classList.replace("a", " a");
				});
				proclaim.throws(function() {
					classList.replace("a", "a ");
				});
			});
			it('if given token does not exist in the DOMTokenList instance, return `false`', function(){
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFalse(classList.replace("a", "b"));
			});
			it('if given token does not in the DOMTokenList instance, replace it with `newToken` and return `true`', function(){
				var link = document.createElement('link');
				link.rel = 'a';
				var classList = link.classList;
				proclaim.isTrue(classList.replace("a", "b"));
				proclaim.equal(link.rel, 'b');
				proclaim.equal(classList.length, 1);
			});
		});
		// describe('supports(token)', function(){
		// 	it('is a function', function() {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.isFunction(classList.supports);
		// 	});
		// 	it('has correct arity', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.arity(classList.supports, 1);
		// 	});
		// 	it('has correct name', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.hasName(classList.supports, 'supports');
		// 	});
		// });
		describe('toString()', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.toString);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.toString, 0);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.toString, 'toString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var link = document.createElement('link');
				link.rel = ' a  ';
				var classList = link.classList;
				proclaim.equal(classList.toString(), link.rel);
			});
		});	
		describe('toLocaleString()', function(){
			it('is a function', function() {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.isFunction(classList.toLocaleString);
			});
			it('has correct arity', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.arity(classList.toLocaleString, 1);
			});
			it('has correct name', function () {
				var link = document.createElement('link');
				var classList = link.classList;
				proclaim.hasName(classList.toLocaleString, 'toLocaleString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var link = document.createElement('link');
				link.rel = ' a  ';
				var classList = link.classList;
				proclaim.equal(classList.toLocaleString(), link.rel);
			});
		});
		// describe('entries()', function(){
		// 	it('is a function', function() {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.isFunction(classList.entries);
		// 	});
		// 	it('has correct arity', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.arity(classList.entries, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.hasName(classList.entries, 'entries');
		// 	});
		// });
		// describe('forEach()', function(){
		// 	it('is a function', function() {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.isFunction(classList.forEach);
		// 	});
		// 	it('has correct arity', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.arity(classList.forEach, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.hasName(classList.forEach, 'forEach');
		// 	});
		// });
		// describe('keys()', function(){
		// 	it('is a function', function() {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.isFunction(classList.keys);
		// 	});
		// 	it('has correct arity', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.arity(classList.keys, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.hasName(classList.keys, 'keys');
		// 	});
		// });
		// describe('values()', function(){
		// 	it('is a function', function() {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.isFunction(classList.values);
		// 	});
		// 	it('has correct arity', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.arity(classList.values, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var link = document.createElement('link');
		// 		var classList = link.classList;
		// 		proclaim.hasName(classList.values, 'values');
		// 	});
		// });

		describe('value', function(){
			if (hasGetOwnPropertyDescriptor) {
				it('has a getter function', function(){
					var link = document.createElement('link');
					var classList = link.classList;
					var descriptor = Object.getOwnPropertyDescriptor(classList, 'value');
					proclaim.isFunction(descriptor.get);
				});
				it('has a setter function', function(){
					var link = document.createElement('link');
					var classList = link.classList;
					var descriptor = Object.getOwnPropertyDescriptor(classList, 'value');
					proclaim.isFunction(descriptor.set);
				});
			}
			describe('(getter)', function() {
				it ('should return the literal value of the corresponding attribute', function(){
					var link = document.createElement('link');
					link.rel = ' a  ';
					var classList = link.classList;
					proclaim.equal(classList.value, link.rel);
				});
			});
			describe('(setter)', function() {
				it('should assign the value being set to the corresponding attribute', function() {
					var link = document.createElement('link');
					var classList = link.classList;
					classList.value = ' b  ';
					proclaim.equal(classList.value, ' b  ');
					proclaim.equal(classList.value, link.rel);
				});
				it('should update the DOMTokenList instance with the new length and tokens', function() {
					var link = document.createElement('link');
					var classList = link.classList;
					classList.value = 'a a b';
					proclaim.equal(classList.length, 2);
					proclaim.isTrue(classList.contains('a'));
					proclaim.isTrue(classList.contains('b'));
				});
			});
		});
	});
	describe('(setter)', function() {
		it('updates the element\'s corresponding attribute', function(){
			it('should assign the value being set to the corresponding attribute', function() {
				var link = document.createElement('link');
				link.classList = ' b  ';
				proclaim.equal(link.classList[0], 'b');
				proclaim.equal(link.classList.value, link.rel);
			});
			it('should update the DOMTokenList instance with the new length and tokens', function() {
				var link = document.createElement('link');
				link.classList = 'a a b';
				proclaim.equal(link.classList.length, 2);
				proclaim.isTrue(link.classList.contains('a'));
				proclaim.isTrue(link.classList.contains('b'));
			});
		});
	});
});