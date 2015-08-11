this.addEventListener('focus', function (event) {
	event.target.dispatchEvent(new Event('focusin', {
		bubbles: true,
		cancelable: true
	}));
}, true);

this.addEventListener('blur', function (event) {
	event.target.dispatchEvent(new Event('focusout', {
		bubbles: true,
		cancelable: true
	}));
}, true);
