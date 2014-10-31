(function () {
	function indexOf(array, element) {
		var
		index = -1,
		length = array.length;

		while (++index < length) {
			if (index in array && array[index] === element) {
				return index;
			}
		}

		return -1;
	}

	window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
		if (!type) {
			throw new Error('Not enough arguments');
		}

		var event = document.createEventObject();

		event.type = type;
		event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
		event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

		return event;
	};

	window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
		var
		element = this,
		type = arguments[0],
		listener = arguments[1];

		if (!element._events) {
			element._events = {};
		}

		if (!element._events[type]) {
			element._events[type] = function (event) {
				var
				list = element._events[event.type].list,
				events = list.slice(),
				index = -1,
				length = events.length,
				eventElement;

				event.preventDefault = function preventDefault() {
					if (event.cancelable !== false) {
						event.returnValue = false;
					}
				};

				event.stopPropagation = function stopPropagation() {
					event.cancelBubble = true;
				};

				event.stopImmediatePropagation = function stopImmediatePropagation() {
					event.cancelBubble = true;
					event.cancelImmediate = true;
				};

				event.currentTarget = element;
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || element;
				event.timeStamp = new Date().getTime();

				if (event.clientX) {
					event.pageX = event.clientX + document.documentElement.scrollLeft;
					event.pageY = event.clientY + document.documentElement.scrollTop;
				}

				while (++index < length && !event.cancelImmediate) {
					if (index in events) {
						eventElement = events[index];

						if (indexOf(list, eventElement) !== -1) {
							eventElement.call(element, event);
						}
					}
				}
			};

			element._events[type].list = [];

			if (element.attachEvent) {
				element.attachEvent('on' + type, element._events[type]);
			}
		}

		element._events[type].list.push(listener);
	};

	window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
		var
		element = this,
		type = arguments[0],
		listener = arguments[1].
		index;

		if (element._events && element._events[type] && element._events[type].list) {
			index = indexOf(element._events[type].list, listener);

			if (index !== -1) {
				element._events[type].list.splice(index, 1);

				if (!element._events[type].list.length) {
					if (element.detachEvent) {
						element.detachEvent('on' + type, element._events[type]);
					}
				}
			}
		}
	};

	window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
		if (!arguments.length) {
			throw new Error('Not enough arguments');
		}

		if (!event || typeof event.type !== 'string') {
			throw new Error('DOM Events Exception 0');
		}

		var element = this, type = event.type;

		try {
			if (!event.bubbles) {
				event.cancelBubble = true;

				var cancelBubbleEvent = function (event) {
					event.cancelBubble = true;

					(element || window).detachEvent('on' + type, cancelBubbleEvent);
				};

				this.attachEvent('on' + type, cancelBubbleEvent);
			}

			this.fireEvent('on' + type, event);
		} catch (error) {
			event.target = element;

			do {
				event.currentTarget = element;

				if ('_events' in element && typeof element._events[type] === 'function') {
					element._events[type].call(element, event);
				}

				if (typeof element['on' + type] === 'function') {
					element['on' + type].call(element, event);
				}

				element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
			} while (element && !event.cancelBubble);
		}

		return true;
	};
})();
