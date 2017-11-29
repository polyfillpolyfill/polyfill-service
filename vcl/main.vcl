import boltsort;

backend us_qa {
	.connect_timeout = 2s;
	.dynamic = true;
	.port = "80";
	.host = "ft-polyfill-service-us-qa.herokuapp.com";
	.first_byte_timeout = 30s;
	.max_connections = 200;
	.between_bytes_timeout = 20s;
    .probe = {
        .request = "HEAD /__health HTTP/1.1"  "Host: ft-polyfill-service-us-qa.herokuapp.com" "Connection: close";
        .window = 2;
        .threshold = 1;
        .timeout = 5s;
        .initial = 1;
        .expected_response = 200;
        .interval = 30s;
    }
}

backend eu_qa {
	.connect_timeout = 2s;
	.dynamic = true;
	.port = "80";
	.host = "ft-polyfill-service-qa.herokuapp.com";
	.first_byte_timeout = 30s;
	.max_connections = 200;
	.between_bytes_timeout = 20s;
    .probe = {
        .request = "HEAD /__health HTTP/1.1"  "Host: ft-polyfill-service-qa.herokuapp.com" "Connection: close";
        .window = 2;
        .threshold = 1;
        .timeout = 5s;
        .initial = 1;
				.expected_response = 200;
        .interval = 30s;
    }
}

backend us_prod {
	.connect_timeout = 2s;
	.dynamic = true;
	.port = "80";
	.host = "ft-polyfill-service-us.herokuapp.com";
	.first_byte_timeout = 30s;
	.max_connections = 200;
	.between_bytes_timeout = 20s;
    .probe = {
        .request = "HEAD /__health HTTP/1.1"  "Host: ft-polyfill-service-us.herokuapp.com" "Connection: close";
        .window = 2;
        .threshold = 1;
        .timeout = 5s;
        .initial = 1;
        .expected_response = 200;
        .interval = 30s;
    }
}

backend eu_prod {
	.connect_timeout = 2s;
	.dynamic = true;
	.port = "80";
	.host = "ft-polyfill-service.herokuapp.com";
	.first_byte_timeout = 30s;
	.max_connections = 200;
	.between_bytes_timeout = 20s;
    .probe = {
        .request = "HEAD /__health HTTP/1.1"  "Host: ft-polyfill-service.herokuapp.com" "Connection: close";
        .window = 2;
        .threshold = 1;
        .timeout = 5s;
        .initial = 1;
        .expected_response = 200;
        .interval = 30s;
    }
}


table origin_hosts {
  "us-prod": "ft-polyfill-service-us.herokuapp.com",
  "us-qa": "ft-polyfill-service-us-qa.herokuapp.com",
  "eu-prod": "ft-polyfill-service.herokuapp.com",
  "eu-qa": "ft-polyfill-service-qa.herokuapp.com"
}

sub set_backend_and_host {
	declare local var.env STRING;
	declare local var.geo STRING;
	declare local var.server STRING;

	# Set origin environment - by default match VCL environment, but allow override via header for testing
	set var.env = if (req.http.X-Origin-Env == "qa" || req.http.X-Origin-Env == "prod" , req.http.X-Origin-Env, if(req.http.Host == "qa.polyfill.io", "qa", "prod"));

	# Set origin geography - US servers or EU servers
	set var.geo = if (client.geo.continent_code ~ "(NA|SA|OC|AS)", "us", "eu");
	set var.server = var.geo "-" var.env;
	set req.http.Host = table.lookup(origin_hosts, var.server);

	if (var.geo == "us") {
		if (var.env == "prod") {
			set req.backend = us_prod;
			set req.http.X-Backend = "us_prod";
		} else {
			set req.backend = us_qa;
			set req.http.X-Backend = "us_qa";
		}
	} else {
		if (var.env == "prod") {
			set req.backend = eu_prod;
			set req.http.X-Backend = "eu_prod";
		} else {
			set req.backend = eu_qa;
			set req.http.X-Backend = "eu_qa";
		}
	}

	# Swap to the other geography if the primary one is down
	if (!req.backend.healthy) {
		set var.geo = if (var.geo == "us", "eu", "us");
		set var.server = var.geo "-" var.env;
		set req.http.Host = table.lookup(origin_hosts, var.server);

		if (var.geo == "us") {
			if (var.env == "prod") {
				set req.backend = us_prod;
			} else {
				set req.backend = us_qa;
			}
		} else {
			if (var.env == "prod") {
				set req.backend = eu_prod;
			} else {
				set req.backend = eu_qa;
			}
		}
	}
}

sub vcl_recv {
#FASTLY recv

	# Enable API key authentication for URL purge requests
	if ( req.request == "FASTLYPURGE" ) {
		set req.http.Fastly-Purge-Requires-Auth = "1";
	}

	if (req.http.Host ~ "polyfills.io") {
		# Do the canonicalise check before the SSL check to avoid a double redirect
		error 751 "Canonicalise";
	}

	if (!req.http.Fastly-SSL) {
		# 801 is a special error code that Fastly uses to Force SSL on the request
		error 801 "Redirect to prod HTTPS";
	}

	if (req.url ~ "^/v2/(polyfill\.|recordRumData)" && req.url !~ "[\?\&]ua=") {
		set req.http.X-Orig-URL = req.url;
		set req.url = "/v2/normalizeUa?ua=" urlencode(req.http.User-Agent);
	}

	if (req.url ~ "^/v2/recordRumData" && req.http.Normalized-User-Agent) {
		declare local var.rumRequestID STRING;
		declare local var.rumLogString STRING;
		declare local var.safeIP STRING;
		declare local var.safeRef STRING;

		set var.rumRequestID = now.sec "-" randomstr(10, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
		set var.safeIP = table.lookup(config, "salt_ip") addr.extract_bits(client.ip, 16, 32);
		set var.safeRef = table.lookup(config, "salt_refer_domain") regsub(req.http.Referer, "^(https?\:\/\/)?(www\.)?(.+?)(\:\d+)?([\/\?].*)?$", "\3");
		set var.rumLogString = ""
			{""request_id":""} cstr_escape(var.rumRequestID) {"","}
			{""request_time":""} strftime({"%Y-%m-%dT%H:%M:%SZ"}, time.start) {"","}
			{""country":""} cstr_escape(geoip.country_code) {"","}
			{""data_center":""} cstr_escape(if(req.http.Cookie:FastlyDC, req.http.Cookie:FastlyDC, server.datacenter)) {"","}
			{""refer_domain_hash":""} cstr_escape(regsub(digest.hash_sha256(var.safeRef), "^(.{15}).*?$", "\1")) {"","}
			{""client_ip_hash":""} cstr_escape(regsub(digest.hash_sha256(var.safeIP), "^(.{15}).*?$", "\1")) {"","}
			{""ua_family":""} cstr_escape(regsub(urldecode(req.http.Normalized-User-Agent), "^(\w+)\/.*$", "\1")) {"","}
			{""elapsed_msec":"} time.elapsed.msec # Guaranteed numeric value; last item so no comma
		;
		if (req.url.qs ~ "^(.*\&)?dns=(\d+)") {
			set var.rumLogString = var.rumLogString {","perf_dns":"} re.group.2;
		}
		if (req.url.qs ~ "^(.*\&)?connect=(\d+)") {
			set var.rumLogString = var.rumLogString {","perf_connect":"} re.group.2;
		}
		if (req.url.qs ~ "^(.*\&)?req=(\d+)") {
			set var.rumLogString = var.rumLogString {","perf_req":"} re.group.2;
		}
		if (req.url.qs ~ "^(.*\&)?resp=(\d+)") {
			set var.rumLogString = var.rumLogString {","perf_resp":"} re.group.2;
		}
		if (urldecode(req.http.Normalized-User-Agent) ~ "^\w+\/(\d+(\.\d+)?).*?$") {
			set var.rumLogString = var.rumLogString {","ua_version":"} re.group.1;
		}

		# Send request summary log event
		log "syslog " req.service_id " rum_requests :: {" var.rumLogString "}";

		# Send log events for each feature detect
		if (req.url.qs ~ "^(.*\&)?detect0=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect1=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect2=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect3=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect4=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect5=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect6=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect7=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect8=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}
		if (req.url.qs ~ "^(.*\&)?detect9=(\w+)_([10])(\&.*)?$") {
			log "syslog " req.service_id " rum_detect_results :: {"
				{""request_id":""} cstr_escape(var.rumRequestID) {"","}
				{""feature_name":""} cstr_escape(re.group.2) {"","}
				{""result":"} if(re.group.2 == "1", "true", "false") # Final log item has no trailing comma
			"}";
		}

		# Return an empty response to the client
		error 904 var.rumLogString;
	}

	set req.url = boltsort.sort(req.url);

	set req.http.X-Original-Host = if(req.http.X-Original-Host, req.http.X-Original-Host, req.http.Host);
	call set_backend_and_host;

	# https://community.fastly.com/t/brotli-compression-support/578/6
	if (req.http.Fastly-Orig-Accept-Encoding) {
		if (req.http.User-Agent ~ "MSIE 6") {
			# For that 0.3% of stubborn users out there
			unset req.http.Accept-Encoding;
		} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "br") {
			set req.http.Accept-Encoding = "br";
		} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "gzip") {
			set req.http.Accept-Encoding = "gzip";
		} else {
			unset req.http.Accept-Encoding;
		}
	}

	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
		return(pass);
	}

	return(lookup);
}

sub vcl_fetch {

	# Deliver stale if possible when unexpected errors are received from origin
	# This includes 404s because Heroku will deliver a 404 if you hit the 'no app
	# found' page.
	if ((beresp.status >= 500 && beresp.status < 600) ||  beresp.status == 404) {
		if (stale.exists) {
			return(deliver_stale);
		}
	}

#FASTLY fetch

	return(deliver);
}

sub vcl_deliver {
#FASTLY deliver

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

	if (req.http.Fastly-Debug) {
		set resp.http.Debug-Host = req.http.Host;
		set resp.http.Debug-X-Original-Host = req.http.X-Original-Host;
		set resp.http.Debug-X-Backend = req.http.X-Backend;
	}

	set resp.http.Age = "0";

	return(deliver);
}

sub vcl_error {
#FASTLY error

	# Redirect to canonical prod/qa origins
	if (obj.status == 751) {
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		set obj.http.Location = "https://polyfill.io" req.url;
		synthetic {""};
		return (deliver);
	}

	# RUM response
	if (obj.status == 904) {
		set obj.http.RUM-Debug = obj.response;
		set obj.status = 204;
		set obj.response = "No Content";
		set obj.http.Cache-Control = "private, no-store";
		return(deliver);
	}
}

sub vcl_log {

	# Intentionally disabling Fastly's log macro to avoid logging
	# events based on log schemes declared in the UI.
	if (!req.url) {
		#FASTLY log
	}

	log "syslog :: " req.service_id " s3 :: " req.http.host " " server.region " [" strftime({"%Y-%m-%d %H:%M:%S"}, time.start) "." time.start.msec_frac {"] ""} cstr_escape(req.request) " " cstr_escape(req.url) " " cstr_escape(req.proto) {"" "} resp.status " " req.bytes_read " " resp.bytes_written " " time.elapsed.msec " " tls.client.protocol " " fastly_info.state " " cstr_escape(req.http.Referer_domain) " " cstr_escape(req.http.Normalized-User-Agent);
}
