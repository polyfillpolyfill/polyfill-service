// Window.prototype.CustomEvent
window.CustomEvent = window.prototype.CustomEvent = function CustomEvent(type, eventInitDict) {
	var event = new Event(type, eventInitDict);

	event.detail = eventInitDict && eventInitDict.detail || {};

	return event;
};
