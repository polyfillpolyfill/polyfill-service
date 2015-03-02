Object.defineProperty(window.location, 'origin', {
	enumerable: true,
	writable: false,
	value: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
	configurable: false
} );
