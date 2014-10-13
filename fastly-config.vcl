
sub vcl_deliver {
#FASTLY deliver
	if (resp.status == 301) {
		set req.http.Fastly-force-Shield = "1";
		set req.url = resp.http.Location;
		restart;
	}
	return(deliver);
}

sub vcl_hash {

	if (req.url ~ "^\/v1\/polyfill\." && req.url !~ "[\?\&]ua=") {
		set req.hash += req.http.User-Agent;
	}
	set req.hash += req.url;
	set req.hash += req.http.host;
#FASTLY hash
	return (hash);
}
