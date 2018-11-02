'document' in this && 'HTMLIFrameElement' in this && 'sandbox' in HTMLIFrameElement.prototype && (function () {
	var e = document.createElement('iframe');
	e.sandbox.add('allow-scripts', 'allow-modals');
	return e.sandbox.contains('allow-modals');
}())
