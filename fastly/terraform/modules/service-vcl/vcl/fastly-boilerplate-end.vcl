# Finish up the VCL.
sub vcl_recv {
	if (req.method != "HEAD" && req.method != "GET" && req.method != "FASTLYPURGE") {
		return (pass);
	}

	return (lookup);
}

sub vcl_fetch {
	/* if (beresp.http.Set-Cookie) {
		set req.http.Fastly-Cachetype = "SETCOOKIE";
		return (pass);
	}

	if (beresp.http.Cache-Control ~ "private") {
		set req.http.Fastly-Cachetype = "PRIVATE";
		return (pass);
	} */

	return (deliver);
}

sub vcl_hit {
	/* if (!obj.cacheable) {
		return (pass);
	} */

	return (deliver);
}

sub vcl_miss {
	return (fetch);
}

sub vcl_deliver {
	return (deliver);
}
