document.attachEvent('onreadystatechange', function() {
	if (document.readyState === 'complete') {
		document.dispatchEvent(new Event('DOMContentLoaded', {
			bubbles: true
		}));
	}
});
