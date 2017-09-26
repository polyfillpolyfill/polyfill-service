import boltsort;

table origin_hosts {
  "us-prod": "ft-polyfill-service-us.herokuapp.com",
  "us-qa": "ft-polyfill-service-us-qa.herokuapp.com",
  "eu-prod": "ft-polyfill-service.herokuapp.com",
  "eu-qa": "ft-polyfill-service-qa.herokuapp.com"
}

sub vcl_recv {

	declare local var.env STRING;
	declare local var.geo STRING;
	declare local var.server STRING;

#FASTLY recv

	# Enable API key authentication for URL purge requests
	if ( req.request == "FASTLYPURGE" ) {
		set req.http.Fastly-Purge-Requires-Auth = "1";
	}

	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
		return(pass);
	}

	if (req.http.Host ~ "polyfills.io") {
		# Do the canonicalise check before the SSL check to avoid a double redirect
		error 751 "Canonicalise";
	}

	if (!req.http.Fastly-SSL) {
		# 801 is a special error code that Fastly uses to Force SSL on the request
		error 801 "Redirect to prod HTTPS";
	}

	if (req.url ~ "^/v2/(polyfill\.|recordRumData)" && req.url !~ "[\?\&]ua=") {
		set req.http.X-Orig-URL = req.url;
		set req.url = "/v2/normalizeUa?ua=" urlencode(req.http.User-Agent);
	}

	if (req.url ~ "^/v2/recordRumData" && req.http.Normalized-User-Agent) {
		set req.http.Log = regsub(req.url, "^.*?\?(.*)$", "\1") "&ip=" client.ip "&refer_domain=" regsub(req.http.Referer, "^(https?\:\/\/)?(www\.)?(.+?)(\:\d+)?([\/\?].*)?$", "\3") "&country=" geoip.country_code "&data_center=" if(req.http.Cookie:FastlyDC, req.http.Cookie:FastlyDC, server.datacenter);
		error 204 "No Content";
	}

	set req.url = boltsort.sort(req.url);

	if (req.restarts == 0) {
		set req.http.X-Original-Host = req.http.Host;

		# Set origin geography - US servers or EU servers
		set var.geo = if (client.geo.continent_code ~ "(NA|SA|OC|AS)", "us", "eu");
		if (var.geo == "us") {
			set req.backend = origami_polyfill_service_us;
		} else {
			set req.backend = origami_polyfill_service_eu;
		}
		
		# Swap to the other geography if the primary one is down
		if (!req.backend.healthy) {
			set var.geo = if (var.geo == "us", "eu", "us");

			if (var.geo == "us") {
				set req.backend = origami_polyfill_service_us;
			} else {
				set req.backend = origami_polyfill_service_eu;
			}
		}
		
		# Set origin environment - by default match VCL environment, but allow override via header for testing
		set var.env = if (req.http.X-Origin-Env, req.http.X-Origin-Env, if(req.http.Host == "qa.polyfill.io", "qa", "prod"));
		set var.server = var.geo "-" var.env;
		set req.http.Host = table.lookup(origin_hosts, var.server);
	}

	# https://community.fastly.com/t/brotli-compression-support/578/6
	if (req.http.Fastly-Orig-Accept-Encoding) {
		if (req.http.User-Agent ~ "MSIE 6") {
			# For that 0.3% of stubborn users out there
			unset req.http.Accept-Encoding;
		} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "br") {
			set req.http.Accept-Encoding = "br";
		} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "gzip") {
			set req.http.Accept-Encoding = "gzip";
		} else {
			unset req.http.Accept-Encoding;
		}
	}

	return(lookup);
}

sub vcl_fetch {

	# Deliver stale if possible when unexpected errors are received from origin
	# This includes 404s because Heroku will deliver a 404 if you hit the 'no app
	# found' page.
	if ((beresp.status >= 500 && beresp.status < 600) ||  beresp.status == 404) {
		if (stale.exists) {
			return(deliver_stale);
		}
	}

#FASTLY fetch

	return(deliver);
}

sub vcl_deliver {
#FASTLY deliver

	# If the response is to a normalise request and there's a parked "original request", use the normalised UA response to modify the original request and restart it
	if (req.url ~ "^/v\d/normalizeUa" && resp.status == 200 && req.http.X-Orig-URL ~ "^/v2/(polyfill\.|recordRumData)") {
		set req.http.Fastly-force-Shield = "1";
		set req.http.Normalized-User-Agent = resp.http.Normalized-User-Agent;
		if (req.http.X-Orig-URL ~ "\?") {
			set req.url = req.http.X-Orig-URL "&ua=" resp.http.Normalized-User-Agent;
		} else {
			set req.url = req.http.X-Orig-URL "?ua=" resp.http.Normalized-User-Agent;
		}
		restart;

	# If the original request didn't specify a UA override, and we added one when the request was sent to the backend, the backend won't have included a Vary:user-agent header (correctly) but we need to add one
	} else if (req.url ~ "^/v\d/polyfill\..*[\?\&]ua=" && req.http.X-Orig-URL && req.http.X-Orig-URL !~ "[\?\&]ua=") {
		add resp.http.Vary = "User-Agent";
	}

	if (req.url ~ "[\&\?]rum=1") {
		add resp.http.Set-Cookie = "FastlyDC=" server.datacenter "; Path=/; HttpOnly; max-age=60";
	}

	if (req.http.Fastly-Debug) {
		set resp.http.Debug-Host = req.http.Host;
		set resp.http.Debug-X-Original-Host = req.http.X-Original-Host;
	}
	
	set resp.http.Age = "0";

	return(deliver);
}

sub vcl_error {
#FASTLY error

	# Redirect to canonical prod/qa origins
	if (obj.status == 751) {
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		set obj.http.Location = "https://polyfill.io" req.url;
		synthetic {""};
		return (deliver);
	}
}
