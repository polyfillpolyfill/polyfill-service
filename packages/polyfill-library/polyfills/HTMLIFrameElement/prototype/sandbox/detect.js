'document' in this && 'HTMLIFrameElement' in this && 'sandbox' in HTMLIFrameElement.prototype && (function () {
	var e = document.createElement('iframe');
	if ('sandbox' in e) {
		if (typeof e.sandbox.add === 'function') {
			e.sandbox.add('allow-scripts', 'allow-modals');
			return e.sandbox.contains('allow-modals');
		} else {
			return false;
		}
	} else {
		return false;
	}
}())
