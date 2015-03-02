var origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
Object.defineProperty(window.location, 'origin', {
	enumerable: true,
	writable: false,
	value: origin,
	configurable: false
} );
