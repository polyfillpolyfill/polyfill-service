if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {
	(function () {

		var

			// Check if the browser supports the `readyState` property on `script` elements.
			// Guaranteed accurate in IE 6-10.
			// Not correctly supported in any other browsers. =(
			supportsScriptReadyState = 'readyState' in document.createElement('script'),

			// Unfortunately necessary browser detection for Opera.
			isOpera = this.opera && this.opera.toString() === '[object Opera]',

			// Has support for `Object.defineProperty`.
			// Even IE8's incomplete implementation is sufficient here since it works on
			// native DOM interfaces like `document`.
			canDefineProp = typeof Object.defineProperty === 'function',

			// Get the currently "executing" (i.e. EVALUATING) `script` DOM element per the
			// spec requirements for `document.currentScript`.
			_currentEvaluatingScript = function () {
				var

					// Live NodeList collection
					scripts = document.getElementsByTagName('script');

				// Guaranteed accurate for IE 6-10 (but NOT IE11!).
				for (var i = scripts.length; scripts[--i];) {
					if (scripts[i].readyState === 'interactive') {
						return scripts[i];
					}
				}

				return null;
			};


		if (!supportsScriptReadyState) {
			throw new Error('Cannot polyfill `document.currentScript` as your browser does not support the "readyState" DOM property of script elements. Please see https://github.com/Financial-Times/polyfill-service/issues/952 for more information.');
		}
		if (isOpera) {
			throw new Error('Cannot polyfill `document.currentScript` as your Opera browser does not correctly support the "readyState" DOM property of script elements. Please see https://github.com/Financial-Times/polyfill-service/issues/952 for more information.');
		}
		if (!canDefineProp) {
			throw new Error('Cannot polyfill `document.currentScript` as your browser does not support `Object.defineProperty`. Please see https://github.com/Financial-Times/polyfill-service/issues/952 for more information.');
		}


		Object.defineProperty(document, 'currentScript', {
			get: function Document$currentScript() {
				return _currentEvaluatingScript();
			},
			configurable: true
		});

	}());
}
