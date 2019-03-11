sub vcl_recv {
	if (req.http.Host ~ "polyfills.io") {
		# Fastly recommend using the 900-999 range of status codes for custom errors within an application's VCL.
		# Do the canonicalise check before the HTTPS check to avoid a double redirect
		error 901 "Canonicalise";
	}
	if (!req.http.Fastly-SSL) {
		# 801 is a special error code that Fastly uses to Force HTTPS on the request
		error 801 "Redirect to HTTPS";
	}
	if (req.http.Orig-URL ~ "^/v1") {
		error 902 "Redirect to V2";
	}

	if (req.url.path == "/") {
		error 908;
	}
}

sub vcl_error {
  # Redirect to canonical prod/qa origins
	if (obj.status == 901) {
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		set obj.http.Location = "https://polyfill.io" req.url;
		synthetic {""};
		return (deliver);
	}
	# Redirect to v2
	if (obj.status == 902) {
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		# Remove libVersion and gated query parameters if they exist.
		set req.url = querystring.regfilter(req.url, "^\b(libVersion|gated)\b.*");
		set obj.http.Location = if(req.url.path == "/v1", "/v3/", regsub(req.url, "^/v1", "/v2"));
		set obj.http.Deprecation-Notice = "API version 1 has been decommissioned - see the body of this response for more information.";
		synthetic {"API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output."};
		return (deliver);
	}

	# Redirect to v3
	if (obj.status == 908) {
		set obj.status = 301;
		set obj.http.Location = "/v3/";
		return (deliver);
	}
}
