sub vcl_recv {
	# Because the old service had a router which allowed any words between /v2/polyfill. and .js
	if (req.url.path ~ "^/v2/polyfill(\.\w+)(\.\w+)?" && req.url.ext == "js") {
		if (re.group.2) {
			set req.url = "/v2/polyfill.min.js?" req.url.qs;
		} else {
			set req.url = "/v2/polyfill.js?" req.url.qs;
		}
	}

	# Override the v3 defaults with the defaults of v2
	if (req.url ~ "^/v2/polyfill(\.min)?\.js") {
		set req.url = regsub(req.url, "^/v2", "/v3");
		set req.url = querystring.set(req.url, "version", "3.25.1");
		declare local var.unknown STRING;
		set var.unknown = subfield(req.url.qs, "unknown", "&");
		set req.url = querystring.set(req.url, "unknown", if(var.unknown != "", var.unknown, "ignore"));
	}

	if (req.url ~ "^/v3/polyfill(\.min)?\.js") {
		call normalise_querystring_parameters_for_polyfill_bundle;
		# Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
		# If querystring is empty, remove the ? from the url.
		set req.url = querystring.clean(querystring.sort(req.url));
	}

	set req.http.referer_domain = if(req.http.referer ~ "^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)", re.group.1, "");
}

sub vcl_hash {
	if (req.http.Fastly-Debug) {
		call breadcrumb_hash;
	}

	# We are not adding req.http.host to the hash because we want https://cdn.polyfill.io and https://polyfill.io to be a single object in the cache.
	# As well as any other domains we support such as polyfills.io and cdn.polyfills.io
	# set req.hash += req.http.host;
	set req.hash += req.url;
	set req.hash += req.method;
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
	unset beresp.http.Vary;

	if (beresp.status == 301 || beresp.status == 308) {
		set beresp.http.Cache-Control = "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable";
	}

	# https://yann.mandragor.org/posts/purge-group-pattern/
	if (beresp.http.Surrogate-Key && !std.strstr(beresp.http.Surrogate-Key, "PurgeGroup")) {
		set beresp.http.Surrogate-Key = beresp.http.Surrogate-Key " PurgeGroup" randomint(0, 999);
	} else if (!beresp.http.Surrogate-Key) {
		set beresp.http.Surrogate-Key = "PurgeGroup" randomint(0, 999);
	}

	# These header are only required for HTML documents.
	if (beresp.http.Content-Type ~ "text/html") {
		# Enables the cross-site scripting filter built into most modern web browsers.
		set beresp.http.X-XSS-Protection = "1; mode=block";
	}
	# Prevents MIME-sniffing a response away from the declared content type.
	set beresp.http.X-Content-Type-Options = "nosniff";

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

	# We end up here if
	# - The origin is HEALTHY; and
	# - It returned a valid HTTP response
	#
	# We may still not want to *use* that response, if it's an HTTP error,
	# so that's the case we need to catch here.
	if (beresp.status >= 500 && beresp.status < 600) {
		# There's a stale version available! Serve it.
		if (stale.exists) {
			return(deliver_stale);
		}
		# Cache the error for 1s to allow it to be used for any collapsed requests
		set beresp.cacheable = true;
		set beresp.ttl = 1s;
		return(deliver);
	}
	# If the response is not an error, but it is stale content that's being
	# served from a cache upstream, cache it for a very brief period to
	# clear the request queue.
	if (beresp.status == 200 && beresp.http.x-resp-is-stale) {
		set beresp.ttl = 1s;
		set beresp.stale_while_revalidate = 0s;
		set beresp.stale_if_error = 0s;
		return (deliver);
	}
}

sub vcl_deliver {
	if (req.http.Fastly-Debug) {
		call breadcrumb_deliver;
	}
	if (fastly_info.state ~ "STALE") {
		set resp.http.x-resp-is-stale = "true";
	}

	set req.http.Fastly-Force-Shield = "yes";

	# Allow cross origin GET, HEAD, and OPTIONS requests to be made.
	if (req.http.Origin) {
		set resp.http.Access-Control-Allow-Origin = "*";
		set resp.http.Access-Control-Allow-Methods = "GET,HEAD,OPTIONS";
	}

	if (req.url ~ "^/v3/polyfill(\.min)?\.js" && fastly.ff.visits_this_service == 0) {
		# Need to add "Vary: User-Agent" in after vcl_fetch to avoid the
		# "Vary: User-Agent" entering the Varnish cache.
		# We need "Vary: User-Agent" in the browser cache because a browser
		# may update itself to a version which needs different polyfills
		# So we need to have it ignore the browser cached bundle when the user-agent changes.
		set resp.http.Vary = "User-Agent, Accept-Encoding";
	}

	if (resp.status == 304) {
		set resp.http.Age = "0";
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
		unset resp.http.X-PreFetch-Pass;
		unset resp.http.X-PreFetch-Miss;
		unset resp.http.X-PostFetch;
	}
}

sub vcl_error {
	if (obj.status >= 500 && obj.status < 600) {
		if (stale.exists) {
			return(deliver_stale);
		}
		return(deliver);
	}
}
