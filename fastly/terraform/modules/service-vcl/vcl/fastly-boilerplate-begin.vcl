sub vcl_recv {
	# Give every request a unique ID.
	if (!req.http.X-Request-Id) {
		set req.http.X-Request-Id = digest.hash_sha256(now randomstr(64) req.http.host req.url req.http.Fastly-Client-IP server.identity);
	}

	set req.http.Orig-URL = req.url;

	# Enable API key authentication for URL purge requests
	if ( req.method == "FASTLYPURGE" ) {
		set req.http.Fastly-Purge-Requires-Auth = "1";
	}
}

sub vcl_hash {
#FASTLY hash
}

sub vcl_fetch {
	# Serve stale objects on a backend error.
	if (http_status_matches(beresp.status, "500,502,503,504")) {
		if (stale.exists) {
			return(deliver_stale);
		}

		if (req.restarts < 1 && (req.method == "GET" || req.method == "HEAD")) {
			restart;
		}

		error 503;
	}

#FASTLY fetch

	if (http_status_matches(beresp.status, "500,502,503,504") && req.restarts < 1 && (req.method == "GET" || req.method == "HEAD")) {
		restart;
	}

	if (req.restarts > 0) {
		set beresp.http.Fastly-Restarts = req.restarts;
	}
}

sub vcl_hit {
#FASTLY hit
/* 
	if (!obj.cacheable) {
		return(pass);
	} */
}

sub vcl_miss {
#FASTLY miss
}

sub vcl_deliver {
	# Serve stale objects on a backend error.
	if (http_status_matches(resp.status, "500,502,503,504") && stale.exists) {
		restart;
	}

#FASTLY deliver
}

sub vcl_error {
#FASTLY error

	if (http_status_matches(obj.status, "500,502,503,504") && stale.exists) {
		return(deliver_stale);
	}
}

sub vcl_pass {
#FASTLY pass
}

sub vcl_log {
#FASTLY log
}
