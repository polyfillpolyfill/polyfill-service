sub set_backend {
	# Calculate the ideal region to route the request to.
	declare local var.region STRING;
	if (server.region ~ "(APAC|Asia|North-America|South-America|US-Central|US-East|US-West)") {
		set var.region = "US";
	} else {
		set var.region = "EU";
	}

	# Gather the health of the shields and origins.
	declare local var.v3_eu_is_healthy BOOL;
	set req.backend = F_v3_eu;
	set var.v3_eu_is_healthy = req.backend.healthy;

	declare local var.v3_us_is_healthy BOOL;
	set req.backend = F_v3_us;
	set var.v3_us_is_healthy = req.backend.healthy;

	# Set some sort of default, that shouldn't get used.
	set req.backend = F_v3_eu;

	# Route EU requests to the nearest healthy shield or origin.
	if (var.region == "EU") {
		if (var.v3_eu_is_healthy) {
			set req.backend = F_v3_eu;
		} elseif (var.v3_us_is_healthy) {
			set req.backend = F_v3_us;
		} else {
			# Everything is on fire... but lets try the origin anyway just in case
			# it's the probes that are wrong
			# set req.backend = F_origin_last_ditch_eu;
		}
	}

	# Route US requests to the nearest healthy shield or origin.
	if (var.region == "US") {
		if (var.v3_us_is_healthy) {
			set req.backend = F_v3_us;
		} elseif (var.v3_eu_is_healthy) {
			set req.backend = F_v3_eu;
		} else {
			# Everything is on fire... but lets try the origin anyway just in case
			# it's the probes that are wrong
			# set req.backend = F_origin_last_ditch_us;
		}
	}

	# Persist the decision so we can debug the result.
	set req.http.Debug-Backend = req.backend;

	# The Fastly macro is inserted after the backend is selected because the
	# macro has the code to select the correct req.http.Host value based on the backend.
	#FASTLY recv
}

sub vcl_recv {
	if (req.http.Fastly-Debug) {
		call breadcrumb_recv;
	}

	if (req.method != "GET" && req.method != "HEAD" && req.method != "OPTIONS") {
		error 911;
	}

	if (req.method == "OPTIONS") {
		error 912;
	}

	# Override the v3 defaults with the defaults of v2
	if (req.http.Orig-URL ~ "^/v2/polyfill(\.min)?\.js") {
		set req.url = regsub(req.url, "^/v2", "/v3");
		set req.url = querystring.set(req.url, "version", "3.25.1");
		declare local var.unknown STRING;
		set var.unknown = subfield(req.url.qs, "unknown", "&");
		set req.url = querystring.set(req.url, "unknown", if(var.unknown != "", var.unknown, "ignore"));
	}

	if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js") {
		call normalise_querystring_parameters_for_polyfill_bundle;
	}

	# Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
	# If querystring is empty, remove the ? from the url.
	set req.url = querystring.clean(querystring.sort(req.url));
	call set_backend;
}

sub vcl_hash {
	if (req.http.Fastly-Debug) {
		call breadcrumb_hash;
	}

	# We are not adding req.http.host to the hash because we want https://cdn.polyfill.io and https://polyfill.io to be a single object in the cache.
	# set req.hash += req.http.host;
	set req.hash += req.url;
	# We include return(hash) to stop the function falling through to the default VCL built into varnish, which for vcl_hash will add req.url and req.http.Host to the hash.
	return(hash);
}

sub vcl_miss {
	if (req.http.Fastly-Debug) {
		call breadcrumb_miss;
	}
}

sub vcl_pass {
	if (req.http.Fastly-Debug) {
		call breadcrumb_pass;
	}
}

sub vcl_fetch {
	if (req.http.Fastly-Debug) {
		call breadcrumb_fetch;
	}

	# These header are only required for HTML documents.
	if (beresp.http.Content-Type ~ "text/html") {
		# Enables the cross-site scripting filter built into most modern web browsers.
		set beresp.http.X-XSS-Protection = "1; mode=block";
		
		# Prevents MIME-sniffing a response away from the declared content type.
		set beresp.http.X-Content-Type-Options = "nosniff";

		# Allow only content from the site's own origin (this excludes subdomains) and www.ft.com.
		# Don't allow the website to be used within an iframe
		if (!beresp.http.Content-Security-Policy) {
			set beresp.http.Content-Security-Policy = "default-src 'self'; font-src 'self' https://www.ft.com; img-src 'self' https://www.ft.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
		}
	}

	# Ensure the site is only served over HTTPS and reduce the chances of someone performing a MITM attack.
	set beresp.http.Strict-Transport-Security = "max-age=31536000; includeSubdomains; preload";

	# The Referrer-Policy header governs which referrer information, sent in the Referer header, should be included with requests made.
	# Send a full URL when performing a same-origin request, but only send the origin of the document for other cases.
	set beresp.http.Referrer-Policy = "origin-when-cross-origin";

	# Enable purging of all objects in the Fastly cache by issuing a purge with the key "polyfill-service".
	if (beresp.http.Surrogate-Key !~ "\bpolyfill-service\b") {
		set beresp.http.Surrogate-Key = if(beresp.http.Surrogate-Key, beresp.http.Surrogate-Key " polyfill-service", "polyfill-service");
	}

	set beresp.http.Timing-Allow-Origin = "*";

	if (req.http.Normalized-User-Agent) {
		set beresp.http.Normalized-User-Agent = req.http.Normalized-User-Agent;
		set beresp.http.Detected-User-Agent = req.http.useragent_parser_family "/"  req.http.useragent_parser_major "." req.http.useragent_parser_minor "." req.http.useragent_parser_patch;
	}
}

sub vcl_deliver {
	if (req.http.Fastly-Debug) {
		call breadcrumb_deliver;
	}

	set req.http.Fastly-Force-Shield = "yes";

	# Allow cross origin GET, HEAD, and OPTIONS requests to be made.
	if (req.http.Origin) {
		set resp.http.Access-Control-Allow-Origin = "*";
		set resp.http.Access-Control-Allow-Methods = "GET,HEAD,OPTIONS";
	}

	add resp.http.Server-Timing = fastly_info.state {", fastly;desc="Edge time";dur="} time.elapsed.msec;

	if (req.http.Fastly-Debug) {
		set resp.http.Debug-Backend = req.http.Debug-Backend;
		set resp.http.Debug-Host = req.http.Host;
		set resp.http.Debug-Fastly-Restarts = req.restarts;
		set resp.http.Debug-Orig-URL = req.http.Orig-URL;
		set resp.http.Debug-VCL-Route = req.http.X-VCL-Route;
		set resp.http.useragent_parser_family = req.http.useragent_parser_family;
		set resp.http.useragent_parser_major = req.http.useragent_parser_major;
		set resp.http.useragent_parser_minor = req.http.useragent_parser_minor;
		set resp.http.useragent_parser_patch = req.http.useragent_parser_patch;
	} else {
		unset resp.http.Server;
		unset resp.http.Via;
		unset resp.http.X-Cache;
		unset resp.http.X-Cache-Hits;
		unset resp.http.X-Served-By;
		unset resp.http.X-Timer;
		unset resp.http.Fastly-Restarts;
	}
}

sub vcl_error {
	if (obj.status == 911) {
		set obj.status = 405;
		set obj.response = "METHOD NOT ALLOWED";
		set obj.http.Content-Type = "text/html; charset=utf-8";
		set obj.http.Cache-Control = "private, no-store";
		synthetic req.method " METHOD NOT ALLOWED";
		return (deliver);
	}
	if (obj.status == 912) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Allow = "OPTIONS, GET, HEAD";
		return (deliver);
	}
}
