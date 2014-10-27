window.CustomEvent = function CustomEvent(type, eventInitDict) {
	var event = new Event(type, eventInitDict);
	event.detail = eventInitDict && eventInitDict.detail || null;
	return event;
};
