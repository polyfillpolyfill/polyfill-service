/* eslint-env mocha, browser */
/* global proclaim */

describe('HTMLIFrameElement.prototype.sandbox', function() {
	var hasGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
	if (hasGetOwnPropertyDescriptor) {
		it('has a getter function', function(){
            var descriptor = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'sandbox');
			proclaim.isFunction(descriptor.get);
		});
		it('has a setter function', function(){
			var descriptor = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'sandbox');
			proclaim.isFunction(descriptor.set);
		});
	}

	describe('(getter)', function() {
		it('returns a DOMTokenList instance', function() {
			var span = document.createElement('span');
			var sandbox = span.sandbox;
			proclaim.isInstanceOf(sandbox, DOMTokenList);
			proclaim.equal(sandbox.constructor, DOMTokenList);
			proclaim.equal(sandbox.constructor.name, "DOMTokenList");
			if ("__proto__" in {}) {
				proclaim.equal(sandbox.__proto__ === DOMTokenList.prototype, true);
			}
		});
		describe('length', function() {
			it('is 0 if element has no classes', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 0);
			});
			it('is 1 if element has 1 classes', function(){
				var span = document.createElement('span');
				span.sandbox = 'a';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 1);
			});
			it('is the amount of unique classes that the element has', function(){
				var span = document.createElement('span');
				span.sandbox = 'a a b';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 2);
			});
			it('is read-only', function(){
				var span = document.createElement('span');
				span.sandbox = 'a';
				var sandbox = span.sandbox;
				sandbox.length = 4;
				proclaim.equal(sandbox.length, 1);
			});
		});
		describe('item(index)', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.item);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.item, 1);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.item, 'item');
			});
			it('returns null if no tokens are in the DOMTokenList instance', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isNull(sandbox.item(0));
			});
			it('returns null if given a negative number', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isNull(sandbox.item(-1));
			});
			it('returns the token at the index position', function() {
				var span = document.createElement('span');
				span.sandbox = 'a a b c';
				var sandbox = span.sandbox;
				proclaim.isNull(sandbox.item(0), 'a');
				proclaim.isNull(sandbox.item(1), 'b');
				proclaim.isNull(sandbox.item(2), 'c');
			});
		});
		describe('[index]', function(){
			it('returns undefined if no tokens are in the DOMTokenList instance', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isUndefined(sandbox[0]);
			});
			it('returns the token at the index position', function() {
				var span = document.createElement('span');
				span.sandbox = 'a a b c';
				var sandbox = span.sandbox;
				proclaim.isNull(sandbox[0], 'a');
				proclaim.isNull(sandbox[1], 'b');
				proclaim.isNull(sandbox[2], 'c');
			});
		});
		describe('contains(token)', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.contains);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.contains, 1);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.contains, 'contains');
			});
			it('returns true if the token is present in the DOMTokenList instance', function() {
				var span = document.createElement('span');
				span.sandbox = 'a';
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.contains('a'));
			});
			it('returns false if the token is not present in the DOMTokenList instance', function() {
				var span = document.createElement('span');
				span.sandbox = 'a';
				var sandbox = span.sandbox;
				proclaim.isFalse(sandbox.contains('b'));
			});
		});
		describe('add(tokens...)', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.add);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.add, 0);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.add, 'add');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.add("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.add("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.add(" ");
				});
				proclaim.throws(function() {
					sandbox.add("\ta");
				});
				proclaim.throws(function() {
					sandbox.add("a\t");
				});
				proclaim.throws(function() {
					sandbox.add("\na");
				});
				proclaim.throws(function() {
					sandbox.add("a\n");
				});
				proclaim.throws(function() {
					sandbox.add("\fa");
				});
				proclaim.throws(function() {
					sandbox.add("a\f");
				});
				proclaim.throws(function() {
					sandbox.add("\ra");
				});
				proclaim.throws(function() {
					sandbox.add("a\r");
				});
				proclaim.throws(function() {
					sandbox.add(" a");
				});
				proclaim.throws(function() {
					sandbox.add("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.add("a", " ");
				});
				proclaim.throws(function() {
					sandbox.add("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are added to the DOMTokenList instance', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 0);
				proclaim.throws(function() {
					sandbox.add('a','b','');
				});
				proclaim.equal(sandbox.length, 0);
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are added to the DOMTokenList instance', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 0);
				proclaim.throws(function() {
					sandbox.add('a','b',' ');
				});
				proclaim.equal(sandbox.length, 0);
			});
			it('adds the token to the DOMTokenList instance and onto the corresponding attribute', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				span.sandbox = '';
				proclaim.equal(sandbox.length, 0);
				sandbox.add('a');
				proclaim.equal(sandbox.length, 1);
				proclaim.equal(span.sandbox, 'a');
			});
			it('does not add the token if it already exists', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				span.sandbox = 'a';
				proclaim.equal(sandbox.length, 0);
				sandbox.add('a');
				proclaim.equal(sandbox.length, 0);
				proclaim.equal(span.sandbox, 'a');
			});
			it('adds multiple tokens to the DOMTokenList instance and onto the corresponding attribute', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				span.sandbox = '';
				proclaim.equal(sandbox.length, 0);
				sandbox.add('a', 'b', 'c', 'd', 'a');
				proclaim.equal(sandbox.length, 4);
				proclaim.equal(span.sandbox, 'a b c d');
			});
			it('returns undefined', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isUndefined(sandbox.add('a'));
			});
		});
		describe('remove(tokens...)', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.remove);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.remove, 0);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.remove, 'remove');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.remove("");
				});
			});
			it('throws a SyntaxError if any string in the arguments is empty', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.remove("a", "");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.remove(" ");
				});
				proclaim.throws(function() {
					sandbox.remove("\ta");
				});
				proclaim.throws(function() {
					sandbox.remove("a\t");
				});
				proclaim.throws(function() {
					sandbox.remove("\na");
				});
				proclaim.throws(function() {
					sandbox.remove("a\n");
				});
				proclaim.throws(function() {
					sandbox.remove("\fa");
				});
				proclaim.throws(function() {
					sandbox.remove("a\f");
				});
				proclaim.throws(function() {
					sandbox.remove("\ra");
				});
				proclaim.throws(function() {
					sandbox.remove("a\r");
				});
				proclaim.throws(function() {
					sandbox.remove(" a");
				});
				proclaim.throws(function() {
					sandbox.remove("a ");
				});
			});
			it('throws a InvalidCharacterError if any string in arguments contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.remove("a", " ");
				});
				proclaim.throws(function() {
					sandbox.remove("a", "aa ");
				});
			});
			it('if any of the tokens are an empty string, no tokens are removed from the DOMTokenList instance', function() {
				var span = document.createElement('span');
				span.sandbox = 'a b';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 2);
				proclaim.throws(function() {
					sandbox.remove('a','b','');
				});
				proclaim.equal(sandbox.length, 2);
				proclaim.equal(span.sandbox, 'a b');
			});
			it('if any of the tokens contain ASCII whitespace, no tokens are removed from the DOMTokenList instance', function() {
				var span = document.createElement('span');
				span.sandbox = 'a b';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 2);
				proclaim.throws(function() {
					sandbox.remove('a','b',' ');
				});
				proclaim.equal(sandbox.length, 2);
			});
			it('removes the token from the DOMTokenList instance and the corresponding attribute', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				span.sandbox = 'a';
				proclaim.equal(sandbox.length, 1);
				sandbox.remove('a');
				proclaim.equal(sandbox.length, 0);
				proclaim.equal(span.sandbox, '');
			});
			it('removes multiple tokens from the DOMTokenList instance and the corresponding attribute', function() {
				var span = document.createElement('span');
				span.sandbox = 'a b c d';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.length, 4);
				sandbox.remove('a', 'b');
				proclaim.equal(sandbox.length, 2);
				proclaim.equal(span.sandbox, 'c d');
			});
			it('returns undefined', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isUndefined(sandbox.remove('a'));
			});
		});
		describe('toggle(token [, force])', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.toggle);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.toggle, 1);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.toggle, 'toggle');
			});
			it('throws a SyntaxError if called with an empty string', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.toggle("");
				});
			});
			it('throws a InvalidCharacterError if called with a string which contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.toggle(" ");
				});
				proclaim.throws(function() {
					sandbox.toggle("\ta");
				});
				proclaim.throws(function() {
					sandbox.toggle("a\t");
				});
				proclaim.throws(function() {
					sandbox.toggle("\na");
				});
				proclaim.throws(function() {
					sandbox.toggle("a\n");
				});
				proclaim.throws(function() {
					sandbox.toggle("\fa");
				});
				proclaim.throws(function() {
					sandbox.toggle("a\f");
				});
				proclaim.throws(function() {
					sandbox.toggle("\ra");
				});
				proclaim.throws(function() {
					sandbox.toggle("a\r");
				});
				proclaim.throws(function() {
					sandbox.toggle(" a");
				});
				proclaim.throws(function() {
					sandbox.toggle("a ");
				});
			});
			it('if token exists, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var span = document.createElement('span');
				span.sandbox = 'a b';
				var sandbox = span.sandbox;
				proclaim.isFalse(sandbox.toggle('a'));
				proclaim.equal(span.sandbox, 'b');
				proclaim.equal(sandbox.length, 1);
			});
			it('if token exists and force argument is `false`, it removes the token from the DOMTokenList instance and corresponding attribute and returns `false`', function(){
				var span = document.createElement('span');
				span.sandbox = 'a b';
				var sandbox = span.sandbox;
				proclaim.isFalse(sandbox.toggle('a', false));
				proclaim.equal(span.sandbox, 'b');
				proclaim.equal(sandbox.length, 1);
			});
			it('if token exists and force argument is `true`, it does not remove the token and returns `true`', function(){
				var span = document.createElement('span');
				span.sandbox = 'a b';
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.toggle('a', true));
				proclaim.equal(span.sandbox, 'a b');
				proclaim.equal(sandbox.length, 2);
			});
			it('if token does not exist, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.toggle('a'));
				proclaim.equal(span.sandbox, 'a');
				proclaim.equal(sandbox.length, 1);
			});
			it('if token does not exist and force argument is `true`, it adds the token to the DOMTokenList instance and corresponding attribute and returns `true`', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.toggle('a', true));
				proclaim.equal(span.sandbox, 'a');
				proclaim.equal(sandbox.length, 1);
			});
			it('if token does not exist and force argument is `false`, it does not modify the DOMTokenList instance or the corresponding attribute and returns `false`', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.toggle('a', false));
				proclaim.equal(span.sandbox, '');
				proclaim.equal(sandbox.length, 0);
			});
		});
		describe('replace(token, newToken)', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.replace);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.replace, 2);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.replace, 'replace');
			});
			it('throws a SyntaxError if token is an empty string', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.replace("", "b");
				});
			});
			it('throws a SyntaxError if newToken is an empty string', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.replace("a", "");
				});
			});
			it('throws a InvalidCharacterError if token contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.replace(" ", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("\ta", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("a\t", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("\na", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("a\n", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("\fa", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("a\f", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("\ra", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("a\r", "b");
				});
				proclaim.throws(function() {
					sandbox.replace(" a", "b");
				});
				proclaim.throws(function() {
					sandbox.replace("a ", "b");
				});
			});
			it('throws a InvalidCharacterError if newToken contains ASCII whitespace', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.throws(function() {
					sandbox.replace("a", " ");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "\ta");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "a\t");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "\na");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "a\n");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "\fa");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "a\f");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "\ra");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "a\r");
				});
				proclaim.throws(function() {
					sandbox.replace("a", " a");
				});
				proclaim.throws(function() {
					sandbox.replace("a", "a ");
				});
			});
			it('if given token does not exist in the DOMTokenList instance, return `false`', function(){
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFalse(sandbox.replace("a", "b"));
			});
			it('if given token does not in the DOMTokenList instance, replace it with `newToken` and return `true`', function(){
				var span = document.createElement('span');
				span.sandbox = 'a';
				var sandbox = span.sandbox;
				proclaim.isTrue(sandbox.replace("a", "b"));
				proclaim.equal(span.sandbox, 'b');
				proclaim.equal(sandbox.length, 1);
			});
		});
		// describe('supports(token)', function(){
		// 	it('is a function', function() {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.isFunction(sandbox.supports);
		// 	});
		// 	it('has correct arity', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.arity(sandbox.supports, 1);
		// 	});
		// 	it('has correct name', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.hasName(sandbox.supports, 'supports');
		// 	});
		// });
		describe('toString()', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.toString);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.toString, 0);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.toString, 'toString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var span = document.createElement('span');
				span.sandbox = ' a  ';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.toString(), span.sandbox);
			});
		});	
		describe('toLocaleString()', function(){
			it('is a function', function() {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.isFunction(sandbox.toLocaleString);
			});
			it('has correct arity', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.arity(sandbox.toLocaleString, 1);
			});
			it('has correct name', function () {
				var span = document.createElement('span');
				var sandbox = span.sandbox;
				proclaim.hasName(sandbox.toLocaleString, 'toLocaleString');
			});
			it ('should return the literal value of the corresponding attribute', function(){
				var span = document.createElement('span');
				span.sandbox = ' a  ';
				var sandbox = span.sandbox;
				proclaim.equal(sandbox.toLocaleString(), span.sandbox);
			});
		});
		// describe('entries()', function(){
		// 	it('is a function', function() {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.isFunction(sandbox.entries);
		// 	});
		// 	it('has correct arity', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.arity(sandbox.entries, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.hasName(sandbox.entries, 'entries');
		// 	});
		// });
		// describe('forEach()', function(){
		// 	it('is a function', function() {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.isFunction(sandbox.forEach);
		// 	});
		// 	it('has correct arity', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.arity(sandbox.forEach, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.hasName(sandbox.forEach, 'forEach');
		// 	});
		// });
		// describe('keys()', function(){
		// 	it('is a function', function() {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.isFunction(sandbox.keys);
		// 	});
		// 	it('has correct arity', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.arity(sandbox.keys, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.hasName(sandbox.keys, 'keys');
		// 	});
		// });
		// describe('values()', function(){
		// 	it('is a function', function() {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.isFunction(sandbox.values);
		// 	});
		// 	it('has correct arity', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.arity(sandbox.values, 1);
		// 	});
			
		// 	it('has correct name', function () {
		// 		var span = document.createElement('span');
		// 		var sandbox = span.sandbox;
		// 		proclaim.hasName(sandbox.values, 'values');
		// 	});
		// });

		describe('value', function(){
			if (hasGetOwnPropertyDescriptor) {
				it('has a getter function', function(){
					var span = document.createElement('span');
					var sandbox = span.sandbox;
					var descriptor = Object.getOwnPropertyDescriptor(sandbox, 'value');
					proclaim.isFunction(descriptor.get);
				});
				it('has a setter function', function(){
					var span = document.createElement('span');
					var sandbox = span.sandbox;
					var descriptor = Object.getOwnPropertyDescriptor(sandbox, 'value');
					proclaim.isFunction(descriptor.set);
				});
			}
			describe('(getter)', function() {
				it ('should return the literal value of the corresponding attribute', function(){
					var span = document.createElement('span');
					span.sandbox = ' a  ';
					var sandbox = span.sandbox;
					proclaim.equal(sandbox.value, span.sandbox);
				});
			});
			describe('(setter)', function() {
				it('should assign the value being set to the corresponding attribute', function() {
					var span = document.createElement('span');
					var sandbox = span.sandbox;
					sandbox.value = ' b  ';
					proclaim.equal(sandbox.value, ' b  ');
					proclaim.equal(sandbox.value, span.sandbox);
				});
				it('should update the DOMTokenList instance with the new length and tokens', function() {
					var span = document.createElement('span');
					var sandbox = span.sandbox;
					sandbox.value = 'a a b';
					proclaim.equal(sandbox.length, 2);
					proclaim.isTrue(sandbox.contains('a'));
					proclaim.isTrue(sandbox.contains('b'));
				});
			});
		});
	});
	describe('(setter)', function() {
		it('updates the element\'s corresponding attribute', function(){
			it('should assign the value being set to the corresponding attribute', function() {
				var span = document.createElement('span');
				span.sandbox = ' b  ';
				proclaim.equal(span.sandbox[0], 'b');
				proclaim.equal(span.sandbox.value, span.sandbox);
			});
			it('should update the DOMTokenList instance with the new length and tokens', function() {
				var span = document.createElement('span');
				span.sandbox = 'a a b';
				proclaim.equal(span.sandbox.length, 2);
				proclaim.isTrue(span.sandbox.contains('a'));
				proclaim.isTrue(span.sandbox.contains('b'));
			});
		});
	});
});