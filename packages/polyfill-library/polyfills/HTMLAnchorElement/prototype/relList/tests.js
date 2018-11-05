/* eslint-env mocha, browser */
/* global proclaim */

describe('HTMLAnchorElement.prototype.relList', function() {
	var hasGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
	if (hasGetOwnPropertyDescriptor) {
		it('has a getter function', function(){
			var descriptor = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, 'relList');
			proclaim.isFunction(descriptor.get);
		});
		it('has a setter function', function(){
			var descriptor = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, 'relList');
			proclaim.isFunction(descriptor.set);
		});
	}

	describe('(getter)', function() {
		it('returns a DOMTokenList instance', function() {
			var a = document.createElement('a');
			var relList = a.relList;
			proclaim.isInstanceOf(relList, DOMTokenList);
			proclaim.equal(relList.constructor, DOMTokenList);
			proclaim.hasName(relList.constructor, "DOMTokenList");
			if ("__proto__" in {}) {
				proclaim.equal(relList.__proto__ === DOMTokenList.prototype, true);
			}
		});
		describe('length', function() {
			it('is 0 if element has no classes', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.equal(relList.length, 0);
			});
			it('is 1 if element has 1 classes', function(){
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.equal(relList.length, 1);
			});
			it('is the amount of unique classes that the element has', function(){
				var a = document.createElement('a');
				a.rel = 'a a b';
				var relList = a.relList;
				proclaim.equal(relList.length, 2);
			});
		});
		describe('item(index)', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.item);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.item, 1);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.item, 'item');
			});
			it('returns null if no tokens are in the DOMTokenList instance', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isNull(relList.item(0));
			});
			it('returns null if given a negative number', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isNull(relList.item(-1));
			});
			it('returns the token at the index position', function() {
				var a = document.createElement('a');
				a.rel = 'a a b c';
				var relList = a.relList;
				proclaim.equal(relList.item(0), 'a');
				proclaim.equal(relList.item(1), 'b');
				proclaim.equal(relList.item(2), 'c');
			});
		});
		describe('[index]', function(){
			it('returns undefined if no tokens are in the DOMTokenList instance', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isUndefined(relList[0]);
			});
			it('returns the token at the index position', function() {
				var a = document.createElement('a');
				a.rel = 'a a b c';
				var relList = a.relList;
				proclaim.equal(relList[0], 'a');
				proclaim.equal(relList[1], 'b');
				proclaim.equal(relList[2], 'c');
			});
		});
		describe('contains(token)', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.contains);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.contains, 1);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.contains, 'contains');
			});
			it('returns true if the token is present in the DOMTokenList instance', function() {
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.isTrue(relList.contains('a'));
			});
			it('returns false if the token is not present in the DOMTokenList instance', function() {
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.isFalse(relList.contains('b'));
			});
		});
		describe('add(tokens...)', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.add);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.add, 0);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.add, 'add');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.add("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.add("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.add(" ");
				});
				proclaim.throws(function() {
					relList.add("\ta");
				});
				proclaim.throws(function() {
					relList.add("a\t");
				});
				proclaim.throws(function() {
					relList.add("\na");
				});
				proclaim.throws(function() {
					relList.add("a\n");
				});
				proclaim.throws(function() {
					relList.add("\fa");
				});
				proclaim.throws(function() {
					relList.add("a\f");
				});
				proclaim.throws(function() {
					relList.add("\ra");
				});
				proclaim.throws(function() {
					relList.add("a\r");
				});
				proclaim.throws(function() {
					relList.add(" a");
				});
				proclaim.throws(function() {
					relList.add("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.add("a", " ");
				});
				proclaim.throws(function() {
					relList.add("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are added to the DOMTokenList instance', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.equal(relList.length, 0);
				proclaim.throws(function() {
					relList.add('a','b','');
				});
				proclaim.equal(relList.length, 0);
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are added to the DOMTokenList instance', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.equal(relList.length, 0);
				proclaim.throws(function() {
					relList.add('a','b',' ');
				});
				proclaim.equal(relList.length, 0);
			});
			it('adds the token to the DOMTokenList instance and onto the corresponding attribute', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				a.rel = '';
				proclaim.equal(relList.length, 0);
				relList.add('a');
				proclaim.equal(relList.length, 1);
				proclaim.equal(a.rel, 'a');
			});
			it('does not add the token if it already exists', function() {
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.equal(relList.length, 1);
				relList.add('a');
				proclaim.equal(relList.length, 1);
				proclaim.equal(a.rel, 'a');
			});
			it('adds multiple tokens to the DOMTokenList instance and onto the corresponding attribute', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				a.rel = '';
				proclaim.equal(relList.length, 0);
				relList.add('a', 'b', 'c', 'd', 'a');
				proclaim.equal(relList.length, 4);
				proclaim.equal(a.rel, 'a b c d');
			});
			it('returns undefined', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isUndefined(relList.add('a'));
			});
		});
		describe('remove(tokens...)', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.remove);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.remove, 0);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.remove, 'remove');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.remove("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.remove("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.remove(" ");
				});
				proclaim.throws(function() {
					relList.remove("\ta");
				});
				proclaim.throws(function() {
					relList.remove("a\t");
				});
				proclaim.throws(function() {
					relList.remove("\na");
				});
				proclaim.throws(function() {
					relList.remove("a\n");
				});
				proclaim.throws(function() {
					relList.remove("\fa");
				});
				proclaim.throws(function() {
					relList.remove("a\f");
				});
				proclaim.throws(function() {
					relList.remove("\ra");
				});
				proclaim.throws(function() {
					relList.remove("a\r");
				});
				proclaim.throws(function() {
					relList.remove(" a");
				});
				proclaim.throws(function() {
					relList.remove("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.remove("a", " ");
				});
				proclaim.throws(function() {
					relList.remove("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are removed from the DOMTokenList instance', function() {
				var a = document.createElement('a');
				a.rel = 'a b';
				var relList = a.relList;
				proclaim.equal(relList.length, 2);
				proclaim.throws(function() {
					relList.remove('a','b','');
				});
				proclaim.equal(relList.length, 2);
				proclaim.equal(a.rel, 'a b');
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are removed from the DOMTokenList instance', function() {
				var a = document.createElement('a');
				a.rel = 'a b';
				var relList = a.relList;
				proclaim.equal(relList.length, 2);
				proclaim.throws(function() {
					relList.remove('a','b',' ');
				});
				proclaim.equal(relList.length, 2);
			});
			it('removes the token from the DOMTokenList instance and the corresponding attribute', function() {
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.equal(relList.length, 1);
				relList.remove('a');
				proclaim.equal(relList.length, 0);
				proclaim.equal(a.rel, '');
			});
			it('removes multiple tokens from the DOMTokenList instance and the corresponding attribute', function() {
				var a = document.createElement('a');
				a.rel = 'a b c d';
				var relList = a.relList;
				proclaim.equal(relList.length, 4);
				relList.remove('a', 'b');
				proclaim.equal(relList.length, 2);
				proclaim.equal(a.rel, 'c d');
			});
			it('returns undefined', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isUndefined(relList.remove('a'));
			});
		});
		describe('toggle(token [, force])', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.toggle);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.toggle, 1);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.toggle, 'toggle');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.toggle("");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.toggle(" ");
				});
				proclaim.throws(function() {
					relList.toggle("\ta");
				});
				proclaim.throws(function() {
					relList.toggle("a\t");
				});
				proclaim.throws(function() {
					relList.toggle("\na");
				});
				proclaim.throws(function() {
					relList.toggle("a\n");
				});
				proclaim.throws(function() {
					relList.toggle("\fa");
				});
				proclaim.throws(function() {
					relList.toggle("a\f");
				});
				proclaim.throws(function() {
					relList.toggle("\ra");
				});
				proclaim.throws(function() {
					relList.toggle("a\r");
				});
				proclaim.throws(function() {
					relList.toggle(" a");
				});
				proclaim.throws(function() {
					relList.toggle("a ");
				});
			});
			it('if token exists, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var a = document.createElement('a');
				a.rel = 'a b';
				var relList = a.relList;
				proclaim.isFalse(relList.toggle('a'));
				proclaim.equal(a.rel, 'b');
				proclaim.equal(relList.length, 1);
			});
			it('if token exists and force argument is `false`, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var a = document.createElement('a');
				a.rel = 'a b';
				var relList = a.relList;
				proclaim.isFalse(relList.toggle('a', false));
				proclaim.equal(a.rel, 'b');
				proclaim.equal(relList.length, 1);
			});
			it('if token exists and force argument is `true`, it does not remove the token and returns `true`', function(){
				var a = document.createElement('a');
				a.rel = 'a b';
				var relList = a.relList;
				proclaim.isTrue(relList.toggle('a', true));
				proclaim.equal(a.rel, 'a b');
				proclaim.equal(relList.length, 2);
			});
			it('if token does not exist, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isTrue(relList.toggle('a'));
				proclaim.equal(a.rel, 'a');
				proclaim.equal(relList.length, 1);
			});
			it('if token does not exist and force argument is `true`, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isTrue(relList.toggle('a', true));
				proclaim.equal(a.rel, 'a');
				proclaim.equal(relList.length, 1);
			});
			it('if token does not exist and force argument is `false`, it does not modify the DOMTokenList instance or the corresponding attribute and returns `false`', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFalse(relList.toggle('a', false));
				proclaim.equal(a.rel, '');
				proclaim.equal(relList.length, 0);
			});
		});
		describe('replace(token, newToken)', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.replace);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.replace, 2);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.replace, 'replace');
			});
			it('throws a SyntaxError if token is an empty string', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.replace("", "b");
				});
			});
			it('throws a SyntaxError if newToken is an empty string', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.replace("a", "");
				});
			});
			it('throws a InvalidCharacterError if token contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.replace(" ", "b");
				});
				proclaim.throws(function() {
					relList.replace("\ta", "b");
				});
				proclaim.throws(function() {
					relList.replace("a\t", "b");
				});
				proclaim.throws(function() {
					relList.replace("\na", "b");
				});
				proclaim.throws(function() {
					relList.replace("a\n", "b");
				});
				proclaim.throws(function() {
					relList.replace("\fa", "b");
				});
				proclaim.throws(function() {
					relList.replace("a\f", "b");
				});
				proclaim.throws(function() {
					relList.replace("\ra", "b");
				});
				proclaim.throws(function() {
					relList.replace("a\r", "b");
				});
				proclaim.throws(function() {
					relList.replace(" a", "b");
				});
				proclaim.throws(function() {
					relList.replace("a ", "b");
				});
			});
			it('throws a InvalidCharacterError if newToken contains ASCII whitespace', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.throws(function() {
					relList.replace("a", " ");
				});
				proclaim.throws(function() {
					relList.replace("a", "\ta");
				});
				proclaim.throws(function() {
					relList.replace("a", "a\t");
				});
				proclaim.throws(function() {
					relList.replace("a", "\na");
				});
				proclaim.throws(function() {
					relList.replace("a", "a\n");
				});
				proclaim.throws(function() {
					relList.replace("a", "\fa");
				});
				proclaim.throws(function() {
					relList.replace("a", "a\f");
				});
				proclaim.throws(function() {
					relList.replace("a", "\ra");
				});
				proclaim.throws(function() {
					relList.replace("a", "a\r");
				});
				proclaim.throws(function() {
					relList.replace("a", " a");
				});
				proclaim.throws(function() {
					relList.replace("a", "a ");
				});
			});
			it('if given token does not exist in the DOMTokenList instance, return `false`', function(){
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFalse(relList.replace("a", "b"));
			});
			it('if given token does not in the DOMTokenList instance, replace it with `newToken` and return `true`', function(){
				var a = document.createElement('a');
				a.rel = 'a';
				var relList = a.relList;
				proclaim.isTrue(relList.replace("a", "b"));
				proclaim.equal(a.rel, 'b');
				proclaim.equal(relList.length, 1);
			});
		});
		// describe('supports(token)', function(){
		// 	it('is a function', function() {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.isFunction(relList.supports);
		// 	});
		// 	it('has correct arity', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.arity(relList.supports, 1);
		// 	});
		// 	it('has correct name', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.hasName(relList.supports, 'supports');
		// 	});
		// });
		describe('toString()', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.toString);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.toString, 0);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.toString, 'toString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var a = document.createElement('a');
				a.rel = ' a  ';
				var relList = a.relList;
				proclaim.equal(relList.toString(), a.rel);
			});
		});	
		describe('toLocaleString()', function(){
			it('is a function', function() {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.isFunction(relList.toLocaleString);
			});
			it('has correct arity', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.arity(relList.toLocaleString, 0);
			});
			it('has correct name', function () {
				var a = document.createElement('a');
				var relList = a.relList;
				proclaim.hasName(relList.toLocaleString, 'toLocaleString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var a = document.createElement('a');
				a.rel = ' a  ';
				var relList = a.relList;
				proclaim.equal(relList.toLocaleString(), a.rel);
			});
		});
		// describe('entries()', function(){
		// 	it('is a function', function() {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.isFunction(relList.entries);
		// 	});
		// 	it('has correct arity', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.arity(relList.entries, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.hasName(relList.entries, 'entries');
		// 	});
		// });
		// describe('forEach()', function(){
		// 	it('is a function', function() {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.isFunction(relList.forEach);
		// 	});
		// 	it('has correct arity', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.arity(relList.forEach, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.hasName(relList.forEach, 'forEach');
		// 	});
		// });
		// describe('keys()', function(){
		// 	it('is a function', function() {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.isFunction(relList.keys);
		// 	});
		// 	it('has correct arity', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.arity(relList.keys, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.hasName(relList.keys, 'keys');
		// 	});
		// });
		// describe('values()', function(){
		// 	it('is a function', function() {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.isFunction(relList.values);
		// 	});
		// 	it('has correct arity', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.arity(relList.values, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var a = document.createElement('a');
		// 		var relList = a.relList;
		// 		proclaim.hasName(relList.values, 'values');
		// 	});
		// });

		describe('value', function(){
			if (hasGetOwnPropertyDescriptor) {
				it('has a getter function', function(){
					var a = document.createElement('a');
					var relList = a.relList;
					var descriptor = Object.getOwnPropertyDescriptor(relList.constructor.prototype, 'value');
					proclaim.isFunction(descriptor.get);
				});
				it('has a setter function', function(){
					var a = document.createElement('a');
					var relList = a.relList;
					var descriptor = Object.getOwnPropertyDescriptor(relList.constructor.prototype, 'value');
					proclaim.isFunction(descriptor.set);
				});
			}
			describe('(getter)', function() {
				it ('should return the literal value of the corresponding attribute', function(){
					var a = document.createElement('a');
					a.rel = ' a  ';
					var relList = a.relList;
					proclaim.equal(relList.value, a.rel);
				});
			});
			describe('(setter)', function() {
				it('should assign the value being set to the corresponding attribute', function() {
					var a = document.createElement('a');
					var relList = a.relList;
					relList.value = ' b  ';
					proclaim.equal(relList.value, ' b  ');
					proclaim.equal(relList.value, a.rel);
				});
				it('should update the DOMTokenList instance with the new length and tokens', function() {
					var a = document.createElement('a');
					var relList = a.relList;
					relList.value = 'a a b';
					proclaim.equal(relList.length, 2);
					proclaim.isTrue(relList.contains('a'));
					proclaim.isTrue(relList.contains('b'));
				});
			});
		});
	});
	describe('(setter)', function() {
		it('updates the element\'s corresponding attribute', function(){
			it('should assign the value being set to the corresponding attribute', function() {
				var a = document.createElement('a');
				a.relList = ' b  ';
				proclaim.equal(a.relList[0], 'b');
				proclaim.equal(a.relList.value, a.rel);
			});
			it('should update the DOMTokenList instance with the new length and tokens', function() {
				var a = document.createElement('a');
				a.relList = 'a a b';
				proclaim.equal(a.relList.length, 2);
				proclaim.isTrue(a.relList.contains('a'));
				proclaim.isTrue(a.relList.contains('b'));
			});
		});
	});
});