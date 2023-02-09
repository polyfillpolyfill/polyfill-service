
// DOMTokenList.prototype.replace
(function () {
	var classList = document.createElement('div').classList;
	classList && (classList.constructor.prototype.replace =
		function (token, newToken) {
			var tokenString = '' + token, newTokenString = '' + newToken;

			try {
				new DOMException();
			} catch (e) {
				self.DOMException = function (message, name) {
					if (!(this instanceof DOMException)) return new DOMException(message, name);
					this.message = message;
					this.name = name;
				}
			}

			var error;
			if (!(tokenString && newTokenString)) error = 'SyntaxError';
			if (!error && (/\s/.test(tokenString) || /\s/.test(newTokenString))) error = 'InvalidCharacterError';
			if (error) throw new DOMException('DOMTokenList.replace was provided tokens \'' + tokenString + '\' and \'' + newTokenString + '\'', error);

			if (!this.contains(tokenString)) return false;

			// tokensTobeMoved are "tokenString" and all tokens found after it
			var tokensTobeMoved = [];
			var newTokenFound = false;
			for (var i = 0; i < this.length; ++i)
				if (newTokenString === this.item(i)) newTokenFound = true;
				else if (tokenString === this.item(i)) break;
			for (; i < this.length; ++i) tokensTobeMoved.push(this.item(i));
			for (i = 0; i < tokensTobeMoved.length; ++i) {
				var currentToken = tokensTobeMoved[i];
				currentToken !== newTokenString && this.remove(currentToken);
				currentToken !== tokenString && this.add(currentToken);
				currentToken === tokenString && !newTokenFound && (this.remove(newTokenString), this.add(newTokenString));
			}
			return true;
		}
	);
})();
