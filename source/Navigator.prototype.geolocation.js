// Navigator.prototype.geolocation
(function () {
	function Geolocation() {
		this.getCurrentPosition = getCurrentPosition;
	}

	function Position(response) {
		var date = new Date();

		this.coords = new Coordinates(response);
		this.timestamp = date.getTime();
	}

	function PositionError() {
		this.code = 3;
		this.message = 'Timeout';
	}

	function PositionOptions(options) {
		this.timeout = parseFloat(options.timeout) || timeout;
	}

	function Coordinates(response) {
		this.latitude = response.latitude;
		this.longitude = response.longitude;
	}

	function getCurrentPosition(success, error, options) {
		confirmed = confirmed || window.confirm(request);

		if (!confirmed) {
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

			error.call(window, new PositionError());
		}, positionOptions.timeout);

		geolocation.callback = function (response) {
			clearTimeout(geolocation.timeout);

			setTimeout(function () {
				document.head.removeChild(script);
			});

			delete geolocation.callback;

			success.call(window, new Position(response));
		};

		script.addEventListener('error', function () {
			setTimeout(function () {
				document.head.removeChild(script);
			});

			delete geolocation.callback;

			error.call(window, new PositionError());
		});

		script.src = url_geoip;
	}

	var
	url_geoip = 'http://freegeoip.net/json/?callback=window.navigator.geolocation.callback',
	timeout = 1000 * 60,
	request = 'This Webpage wants to track your physical location.\nDo you allow it?',
	confirmed = false,
	navigator = window.navigator.constructor && window.navigator.constructor !== Object ? window.navigator.constructor.prototype : window.navigator,
	geolocation = navigator.geolocation = new Geolocation();
})();