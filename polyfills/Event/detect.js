(function(){

	if (!('Event' in window)) return false;
	if (typeof window.Event === 'function') return true;

	try {
		new Event('click');
		return true;
	} catch(e) {
		return false;
	}
}())
