(function (global) {
	function Geolocation() {
		this.getCurrentPosition = getCurrentPosition;
	}

	function Position(response) {
		var date = new Date();

		this.coords = new Coordinates(response);
		this.timestamp = date.getTime();
	}

	function PositionError(code) {
		this.code = code;

		this.message = 'Network location provider at \'' + url_geoip + '\' : ' + errors[code - 1];
	}

	function PositionOptions(options) {
		this.timeout = parseFloat(options.timeout) || timeout;
	}

	function Coordinates(response) {
		this.latitude = response.latitude;
		this.longitude = response.longitude;
	}

	function getCurrentPosition(success, error, options) {
		confirmed = confirmed || confirm(request);

		if (!confirmed) {
			setTimeout(function () {
				error.call(global, new PositionError(1));
			});

			return;
		}

		var
		script = document.head.appendChild(document.createElement('script')),
		positionOptions = new PositionOptions(options || {});

		geolocation.timeout = setTimeout(function () {
			setTimeout(function () {
				document.head.removeChild(script);
			});

			delete geolocation.callback;

			error.call(global, new PositionError(3));
		}, positionOptions.timeout);

		geolocation.callback = function (response) {
			clearTimeout(geolocation.timeout);

			setTimeout(function () {
				document.head.removeChild(script);
			});

			delete geolocation.callback;

			success.call(global, new Position(response));
		};

		script.addEventListener('error', function () {
			setTimeout(function () {
				document.head.removeChild(script);
			});

			delete geolocation.callback;

			error.call(global, new PositionError(2));
		});

		script.src = url_geoip + url_geoip_callback;
	}

	PositionError.prototype.PERMISSION_DENIED = 1;
	PositionError.prototype.POSITION_UNAVAILABLE = 2;
	PositionError.prototype.TIMEOUT = 3;

	var
	url_geoip = 'http://freegeoip.net/',
	url_geoip_callback = 'json/?callback=navigator.geolocation.callback',
	errors = ['Permission denied', 'Position undetermined', 'Timeout elapsed'],
	timeout = 1000 * 60,
	request = 'This page wants to track your physical location.\nDo you allow it?',
	confirmed = false,
	// navigator.geolocation
	geolocation = navigator.geolocation = new Geolocation();
}(this));
