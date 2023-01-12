
// matchMedia
(function() {
	"use strict";

	// For browsers that support matchMedium api such as IE 9 and webkit
	var styleMedia = (self.styleMedia || self.media);

	// For those that don't support matchMedium
	if (!styleMedia) {
		var style       = document.createElement('style'),
			script      = document.getElementsByTagName('script')[0],
			info        = null;

		style.type  = 'text/css';
		style.id    = 'matchmediajs-test';

		if (!script) {
		document.head.appendChild(style);
		} else {
		script.parentNode.insertBefore(style, script);
		}

		// 'style.currentStyle' is used by IE <= 8 and 'self.getComputedStyle' for all other browsers
		info = ('getComputedStyle' in self) && self.getComputedStyle(style, null) || style.currentStyle;

		styleMedia = {
			matchMedium: function(media) {
				media = media.replace(/^only\s+/, '');
				var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

				// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
				if (style.styleSheet) {
					style.styleSheet.cssText = text;
				} else {
					style.textContent = text;
				}

				// Test if media query is true or false
				return info.width === '1px';
			}
		};
	}
	function MediaQueryList() {
		this.matches = false;
		this.media = 'invalid';
		this.listeners = [];
	}

	MediaQueryList.prototype.addListener = function addListener(listener) {
		var listenerIndex = this.listeners.indexOf(listener);

		if (listenerIndex === -1) {
			this.listeners.push(listener);
		}
	};

	MediaQueryList.prototype.removeListener = function removeListener(listener) {
		var listenerIndex = this.listeners.indexOf(listener);

		if (listenerIndex >= 0) {
			this.listeners.splice(listenerIndex, 1);
		}
	};

	self.MediaQueryList = MediaQueryList;

	self.matchMedia = function matchMedia(media) {
		var list = new MediaQueryList();

		if (0 === arguments.length) {
			throw new TypeError('Not enough arguments to matchMedia');
		}

		list.media = String(media);
		list.matches = styleMedia.matchMedium(media || 'all');

		self.addEventListener('resize', function () {
			var listeners = [].concat(list.addListener.listeners), matches = styleMedia.matchMedium(media || 'all');

			if (matches != list.matches) {
				list.matches = matches;
				for (var index = 0, length = listeners.length; index < length; ++index) {
					listeners[index].call(self, list);
				}
			}
		});

		return list;
	};
}());
