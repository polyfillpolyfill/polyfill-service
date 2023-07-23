sub vcl_recv {
	# Fastly recommend using the 900-999 range of status codes for custom errors within an application's VCL.
	if (req.http.Orig-URL ~ "^/v3/normalizeUa") {
		error 903 "Normalise User Agent";
	}
	if (req.http.Orig-URL ~ "^/v3/parseUa") {
		error 904 "Parse User Agent";
	}
	if (req.http.Orig-URL ~ "^/v3/normalise_querystring_parameters_for_polyfill_bundle") {
		error 905 "Normalise querystring parameters for polyfill bundle";
	}
	if (req.http.Orig-URL ~ "^/robots.txt") {
		error 906;
	}
	if (req.url ~ "^/https://cdn.polyfill.io") {
		error 907;
	}
	if (req.url ~ "^/https://polyfill.io") {
		error 907;
	}
	if (req.url ~ "^/pages/fixedData") {
		error 907;
	}
}

sub vcl_error {
	# Normalise User Agent API
	if (obj.status == 903) {
		call normalise_user_agent_1_10_2;
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=UTF-8";
		set obj.http.Normalized-User-Agent = req.http.Normalized-User-Agent;
		synthetic req.http.Normalized-User-Agent;
		return (deliver);
	}

	# Parse User Agent API
	if (obj.status == 904) {
		call useragent_parser;
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=UTF-8";
		set obj.http.useragent_parser_family = req.http.useragent_parser_family;
		set obj.http.useragent_parser_major = req.http.useragent_parser_major;
		set obj.http.useragent_parser_minor = req.http.useragent_parser_minor;
		set obj.http.useragent_parser_patch = req.http.useragent_parser_patch;
		synthetic req.http.useragent_parser_family "/"  req.http.useragent_parser_major "." req.http.useragent_parser_minor "." req.http.useragent_parser_patch;
		return (deliver);
	}

	# Normalise querystring parameters
	if (obj.status == 905) {
		call normalise_querystring_parameters_for_polyfill_bundle;
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "application/json; charset=UTF-8";
		set obj.http.features = subfield(req.url.qs, "features", "&");
		set obj.http.excludes = subfield(req.url.qs, "excludes", "&");
		set obj.http.rum = subfield(req.url.qs, "rum", "&");
		set obj.http.unknown = subfield(req.url.qs, "unknown", "&");
		set obj.http.flags = subfield(req.url.qs, "flags", "&");
		set obj.http.ua = subfield(req.url.qs, "ua", "&");
		set obj.http.callback = subfield(req.url.qs, "callback", "&");
		set obj.http.compression = subfield(req.url.qs, "compression", "&");
		set obj.http.version = subfield(req.url.qs, "version", "&");
		synthetic "{"
			{"""} "features" {"""} ":" {"""} obj.http.features {"""}
			if (obj.http.excludes, ","{"""} "excludes" {"""} ":" {"""} obj.http.excludes {"""}, "")
			","{"""} "rum" {"""} ":" {"""} obj.http.rum {"""}
			","{"""} "unknown" {"""} ":" {"""} obj.http.unknown {"""}
			if (obj.http.flags, ","{"""} "flags" {"""} ":" {"""} obj.http.flags {"""}, "")
			","{"""} "ua" {"""} ":" {"""} obj.http.ua {"""}
			if (obj.http.callback, ","{"""} "callback" {"""} ":" {"""} obj.http.callback {"""}, "")
			if (obj.http.compression, ","{"""} "compression" {"""} ":" {"""} obj.http.compression {"""}, "")
			if (obj.http.version, ","{"""} "version" {"""} ":" {"""} obj.http.version {"""}, "")
		"}";
		return (deliver);
	}

	# /robots.txt endpoint
	if (obj.status == 906) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=UTF-8";
		synthetic {"User-agent: *
Disallow:"};
		return (deliver);
	}

	# return 404
	if (obj.status == 907) {
		set obj.status = 404;
		set obj.response = "Not Found";
		set obj.http.Content-Type = "text/plain; charset=UTF-8";
		synthetic {"Not Found."};
		return (deliver);
	}

    # health
	if (obj.status == 908) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "application/json; charset=UTF-8";
		synthetic {xyz"{"schemaVersion":1,"name":"origami-polyfill-service","systemCode":"origami-polyfill-service","description":"Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent","checks":[{"name":"Server is up","ok":true,"severity":1,"businessImpact":"Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.","technicalSummary":"Tests that the service is up.","panicGuide":"Look at the application logs.","checkOutput":"None","lastUpdated":"2023-06-20T22:07:47.411Z"}]}"xyz};
		return (deliver);
	}

    # gtg
	if (obj.status == 909) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=UTF-8";
		synthetic {"OK"};
		return (deliver);
	}
}