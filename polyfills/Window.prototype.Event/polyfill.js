// Window.prototype.Event
window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
	if (!type) {
		throw new Error('Not enough arguments');
	}

	var
	event = document.createEvent('Event'),
	bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false,
	cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : true;

	event.initEvent(type, bubbles, cancelable);

	return event;
};
