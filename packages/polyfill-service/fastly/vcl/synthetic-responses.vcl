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
	if (req.http.Orig-URL ~ "^/__about") {
		error 906;
	}
	if (req.http.Orig-URL ~ "^/robots.txt") {
		error 907;
	}
}

sub vcl_error {
	# Normalise User Agent API
	if (obj.status == 903) {
		call normalise_user_agent_latest;
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=utf-8";
		set obj.http.Normalized-User-Agent = req.http.Normalized-User-Agent;
		synthetic req.http.Normalized-User-Agent;
		return (deliver);
	}

	# Parse User Agent API
	if (obj.status == 904) {
		call useragent_parser;
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=utf-8";
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
		set obj.http.Content-Type = "application/json; charset=utf-8";
		set obj.http.features = subfield(req.url.qs, "features", "&");
		set obj.http.excludes = urldecode(subfield(req.url.qs, "excludes", "&"));
		set obj.http.rum = subfield(req.url.qs, "rum", "&");
		set obj.http.unknown = subfield(req.url.qs, "unknown", "&");
		set obj.http.flags = subfield(req.url.qs, "flags", "&");
		set obj.http.ua = subfield(req.url.qs, "ua", "&");
		set obj.http.callback = subfield(req.url.qs, "callback", "&");
		set obj.http.compression = subfield(req.url.qs, "compression", "&");
		if (subfield(req.url.qs, "version", "&") != "") {
			set obj.http.version = subfield(req.url.qs, "version", "&");
		}
		synthetic "{" {"""} "features" {"""} ":" {"""} obj.http.features {"""} ","{"""} "excludes" {"""} ":" {"""} obj.http.excludes {"""} ","{"""} "rum" {"""} ":" {"""} obj.http.rum {"""} ","{"""} "unknown" {"""} ":" {"""} obj.http.unknown {"""} ","{"""} "flags" {"""} ":" {"""} obj.http.flags {"""} ","{"""} "ua" {"""} ":" {"""} obj.http.ua {"""} ","{"""} "callback" {"""} ":" {"""} obj.http.callback {"""} ","{"""} "compression" {"""} ":" {"""} obj.http.compression {"""} ","{"""} "version" {"""} ":" {"""} obj.http.version {"""} "}";
		return (deliver);
	}

	# /__about endpoint JSON response
	if (obj.status == 906) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "application/json; charset=utf-8";
		synthetic {heredoc"{"schemaVersion":1,"name":"polyfill-service","systemCode":"origami-polyfill-service","purpose":"Stores a library of FT-approved polyfills and serves them to FT websites that need them in older browsers.","audience":"public","primaryUrl":"https://polyfill.io","serviceTier":"silver","apiVersion":2,"apiVersions":[{"path":"/v1","supportStatus":"deprecated","dateTerminated":"2016-01-01T00:00:00Z"},{"path":"/v2","supportStatus":"active"}],"dateCreated":"2014-07-14T10:28:45Z","contacts":[{"name":"Origami team","email":"origami-support@ft.com","rel":"owner","domain":"All support enquiries"}],"links":[{"url":"https://github.com/Financial-Times/polyfill-service/issues","category":"issues"},{"url":"https://github.com/Financial-Times/polyfill-service","category":"repo"},{"url":"https://dashboard.heroku.com/apps/ft-polyfill-service","category":"deployment","description":"Production Heroku app control panel"},{"url":"https://dashboard.heroku.com/apps/ft-polyfill-service-qa","category":"deployment","description":"QA Heroku app control panel"},{"url":"https://grafana.ft.com/dashboard/db/origami-polyfill-service","category":"monitoring","description":"Grafana dashboard"},{"url":"https://app.fastly.com/#stats/service/4E1GeTez3EFH3cnwfyMAog","category":"deployment","description":"Fastly CDN app"},{"url":"https://my.pingdom.com/reports/uptime#check=1338405","category":"monitoring","description":"Pingdom check"},{"url":"https://docs.google.com/drawings/d/1eA_sYaSRkvOqIxdkN6LRpyHeOzv8Mxr51WMfXM1sS3Q/edit","category":"documentation","description":"Architecture diagram"},{"url":"https://github.com/Financial-Times/polyfill-service/blob/master/README.md","category":"documentation","description":"README"},{"url":"https://travis-ci.org/Financial-Times/polyfill-service","category":"testing","description":"Continuous Integration status on Travis"}],"appVersion":"3.25.1","hostname":"39d7ed20-ff80-4a18-acfe-fd421e14fa8a","dateDeployed":"2018-01-15T16:30:58.000Z"}"heredoc};
		return (deliver);
	}

	# /robots.txt endpoint 
	if (obj.status == 907) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Content-Type = "text/plain; charset=utf-8";
		synthetic {"User-agent: *
Disallow:"};
		return (deliver);
	}
}
