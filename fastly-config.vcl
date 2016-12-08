import boltsort;

sub vcl_recv {
#FASTLY recv

	# Only log 0.1% of requests.
	if (randombool(1, 1000)) {
		set req.http.log = "1";
	}

	# Attach a unique id to each request, can be useful when investigating logs
	if (!req.http.request-id) {
		set req.http.request-id =
			randomstr(8, "0123456789abcdef") "-"
			randomstr(4, "0123456789abcdef") "-4"
			randomstr(3, "0123456789abcdef") "-"
			randomstr(1, "89ab") randomstr(3, "0123456789abcdef") "-"
			randomstr(12, "0123456789abcdef");
	}

	if ( req.request == "FASTLYPURGE" ) {
		set req.http.Fastly-Purge-Requires-Auth = "1";
	}

	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
		return(pass);
	}

	if (!req.http.Fastly-SSL) {
		if (req.http.Host == "cdn.polyfill.io" || req.http.Host == "polyfill.io") {
			error 751 "Redirect to prod HTTPS";
		}
		if (req.http.Host == "qa.polyfill.io") {
			error 752 "Redirect to QA HTTPS";
		}
	}

	if (req.http.Host ~ "polyfills.io") {
		error 751 "Canonicalise";
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

	return(lookup);
}

sub vcl_deliver {
#FASTLY deliver

	call custom_syslog;

	# If we are debugging, it is useful to know what the request-id will be so
	# that we can look at the logs for our requests
	if (req.http.FT-Debug) {
		set resp.http.request-id = req.http.request-id;
	}

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

	return(deliver);
}

sub vcl_error {
#FASTLY error

	# We log all vcl_error calls as these are probably exceptional circumstances
	call custom_error_syslog;

	# Redirect to canonical prod/qa origins
	if (obj.status == 751 || obj.status == 752) {
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		set obj.http.Location = "https://" if(obj.status == 751, "", "qa.") "polyfill.io" req.url;
		synthetic {""};
		return (deliver);
	}
}

sub custom_syslog {
	# The log function will only be called if the request is one of the 25%
	# which we labelled as having logging enabled
	if (req.http.log) {
		log {"syslog ${SERVICEID} Fastly :: serviceid=${SERVICEID}"}
			{" timestamp="} time.start.sec
			{" event="} {"REQUEST"}
			{" host="} req.http.host
			{" request-id="} req.http.request-id
			{" bytes="} resp.http.content-length
			{" client_ip="} req.http.Fastly-Client-IP
			{" method="} req.request
			{" useragent="} req.http.User-Agent
			{" url=""} req.url {"""}
			{" content_type=""} resp.http.Content-Type {"""}
			{" status="} resp.status
			{" content-length="} resp.http.content-length
			if(geoip.city,{" geoip_city=""} geoip.city {"""},{""})
			if(geoip.region,{" geoip_region=""} geoip.region {"""},{""})
			if(geoip.country_code,{" geoip_country="} geoip.country_code,{""})
			if(geoip.continent_code,{" geoip_continent="} geoip.continent_code,{""})
			{" fastly_region="} server.region
			{" fastly_datacenter="} server.datacenter
			{" fastly_node="} server.identity
			{" fastly_state="} fastly_info.state
			{" duration_ms="} time.elapsed.msec
			{" is_ipv6="} req.is_ipv6;
	}
}

sub custom_error_syslog {
	# The reason custom_error_syslog is different from custom_syslog is because when
	# vcl_error is entered, there will be no resp object, which is used inside
	# custom_syslog to log information about the response we are sending

	log {"syslog ${SERVICEID} Fastly :: serviceid=${SERVICEID}"}
		{" timestamp="} time.start.sec
		{" event="} {"REQUEST"}
		{" host="} req.http.host
		{" request-id="} req.http.request-id
		{" client_ip="} req.http.Fastly-Client-IP
		{" method="} req.request
		{" useragent="} req.http.User-Agent
		{" url=""} req.url {"""}
		if(geoip.city,{" geoip_city=""} geoip.city {"""},{""})
		if(geoip.region,{" geoip_region=""} geoip.region {"""},{""})
		if(geoip.country_code,{" geoip_country="} geoip.country_code,{""})
		if(geoip.continent_code,{" geoip_continent="} geoip.continent_code,{""})
		{" fastly_region="} server.region
		{" fastly_datacenter="} server.datacenter
		{" fastly_node="} server.identity
		{" fastly_state="} fastly_info.state
		{" duration_ms="} time.elapsed.msec
		{" is_ipv6="} req.is_ipv6;
}
