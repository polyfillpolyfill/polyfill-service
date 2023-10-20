
// localStorage
(function () {
	function Storage() {}

	Storage.prototype = {
		clear: function () {
			getKeys(this).forEach(this.removeItem, this);
		},
		constructor: Storage,
		getItem: function () {
			var key = String(arguments[0]);

			return key in this ? this[key] : null;
		},
		key: function () {
			var index = parseInt(arguments[0], 10) || 0;

			return getKeys(this)[index] || null;
		},
		removeItem: function () {
			var key = String(arguments[0]);

			if (Object.prototype.hasOwnProperty.call(this, key)) {
				delete this[key];
				--this.length;
			}

			updateKeys();
		},
		setItem: function () {
			var key = String(arguments[0]), value = String(arguments[1]);

			if (!(Object.prototype.hasOwnProperty.call(this, key))) {
				++this.length;
			}

			this[key] = value;

			updateKeys();
		}
	};

	function getKeys(object) {
		var buffer = [], key;

		for (key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key) && key !== 'length') {
				buffer.push(key);
			}
		}

		return buffer;
	}

	function updateKeys() {
		var unloadkeys = [];

		var keys = getKeys(localStorage);
		var encodedKeys = keys.map(encodeKey);

		unloadkeys.concat(keys).forEach(function (key, i) {
			if (key in localStorage) {
				element.setAttribute(makeAttributeName(encodedKeys[i]), localStorage[key]);
			} else {
				element.removeAttribute(makeAttributeName(encodedKeys[i]));
			}
		});

		element.setAttribute(userdata, encodedKeys.join(','));

		element.save(userdata);
	}

	function encodeKey (key) {
		return btoa(String(key))
			.replace(/\+/g, '_')
			.replace(/\//g, '-')
			.replace(/=/g, '');
	}

	function decodeKey (encodedKey) {
		return atob(
			String(encodedKey)
				.replace(/_/g, '+')
				.replace(/-/g, '/')
		);
	}

	function makeAttributeName (encodedKey) {
		return userdata + '_' + encodedKey;
	}

	var localStorageExists = (function() {
		try {
			return !!self.localStorage;
		} catch (e) {
			return false;
		}
	})();

	if (!localStorageExists) {
		var
		// <Global>.localStorage
		localStorage = self.localStorage = new Storage(),
		// set storage element
		element = self.document.lastChild.lastChild.appendChild(self.document.createElement('x-local-storage')),
		// set userdata key and prefix
		userdata = 'base64_userdata',
		keys;

		// proprietary ie local storage
		try {
			element.addBehavior('#default#userdata');
			element.load(userdata);
		// eslint-disable-next-line no-empty
		} catch (error) {}

		// get keys
		keys = element.getAttribute(userdata)
			? element.getAttribute(userdata).split(',').map(decodeKey)
			: [];

		localStorage.length = keys.length;

		// assign keys to localStorage
		keys.forEach(function (key) {
			localStorage[key] = element.getAttribute(makeAttributeName(encodeKey(key)));
		});

		if (self.attachEvent) {
			self.attachEvent('onunload', updateKeys);
		}
	}
}());
