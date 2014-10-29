sub vcl_recv {
#FASTLY recv

	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
		return(pass);
	}

	if (req.url ~ "^/v1/polyfill\." && req.url !~ "[\?\&]ua=") {
		set req.http.X-Orig-URL = req.url;
		set req.url = "/v1/normalizeUa?ua=" urlencode(req.http.User-Agent);
	}

	return(lookup);
}

sub vcl_deliver {
#FASTLY deliver
	if (req.url ~ "^/v1/normalizeUa" && resp.status == 200) {
		set req.http.Fastly-force-Shield = "1";
		if (req.http.X-Orig-URL ~ "\?") {
			set req.url = req.http.X-Orig-URL "&ua=" resp.http.Normalized-User-Agent;
		} else {
			set req.url = req.http.X-Orig-URL "?ua=" resp.http.Normalized-User-Agent;
		}
		restart;
	} else if (req.url ~ "^/v1/polyfill\..*[\?\&]ua=" && req.http.X-Orig-URL && req.http.X-Orig-URL !~ "[\?\&]ua=") {
		set resp.http.Vary = "Accept-Encoding, User-Agent";
	}
	return(deliver);
}
