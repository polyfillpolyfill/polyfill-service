(function() {

	var propName, nativeGetter;
	var err = ' not supported in the screen.orientation polyfill';

	function getVal() {
		var val;

		if (nativeGetter) val = nativeGetter.call(window.screen);

		// If object we assume it's compliant with the spec
		if (typeof val === 'object') return val;

		// If no native implementation is available, guess based on screen width and height (impossible to tell whether device is upside down so consider both portrait orientations to be primary, likewise landscape)
		if (typeof val === 'undefined') {
			val = (screen.width > screen.height) ? 'landscape-primary' : 'portrait-primary';
		}
		return {
			type: val,
			angle: (val.indexOf('secondary') !== -1) ? 180 : 0,
			onchange: function() {
				throw new Error('onchange'+err);
			},
			lock: function(){
				throw new Error('lock method'+err);
			},
			unlock: function(){
				throw new Error('unlock method'+err);
			}
		};
	}

	// Find a native impl if it exists
	if ('orientation' in screen) propName = 'orientation';
	else if ('mozOrientation' in screen) propName = 'mozOrientation';
	else if ('msOrientation' in screen) propName = 'msOrientation';

	nativeGetter = ('getOwnPropertyDescriptor' in Object && Object.getOwnPropertyDescriptor(window.screen, propName)) ||
	               ('__lookupGetter__' in window.screen && window.screen.__lookupGetter__(propName));

	// For completeness, but no browser above our baseline lacks the screen property
	if (!('screen' in window)) window.screen = {};

	// If the value is not an object, the feature either doesn't exist or is incorrectly implemented
	if (typeof window.screen.orientation !== 'object') {

		// Attempt to use a dynamic getter, otherwise just set it to the initial value on load
		try {
			Object.defineProperty(window.screen, 'orientation', {
				get: getVal
			});
		} catch(e1) {

			// screen is read-only in some browsers
			try {
				window.screen.orientation = getVal();
			} catch (e2) {}
		}
	}
}());
