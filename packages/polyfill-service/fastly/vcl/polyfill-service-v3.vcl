sub vcl_recv {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_recv;
		}

		if (req.method != "GET" && req.method != "HEAD" && req.method != "OPTIONS") {
			error 911;
		}

		if (req.method == "OPTIONS") {
 			error 912;
		}

		# This is here to trigger a synthetic response for 404 responses. This is closely tied to code within the vcl_deliver sub-routine.
		if (req.http.route-does-not-exist == "true" && req.restarts > 0) {
			error 910;
		} else {
			unset req.http.route-does-not-exist;
		}

		if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js") {
			call normalise_querystring_parameters_for_polyfill_bundle;
			# The compression query parameter will now be available for use during the rest of the request. The default value of the parameter is an empty string.
			set req.http.Filename = "v3-js/" digest.hash_sha512(req.url) ".js";
			if(subfield(req.url.qs, "compression", "&") != "") {
				set req.http.Filename = req.http.Filename "." subfield(req.url.qs, "compression", "&");
			}
		}

		if (req.http.Orig-URL ~ "^/test/(director|tests?)/?") {
			declare local var.ua STRING;
			set var.ua = urlencode(urldecode(subfield(req.url.qs, "ua", "&")));
			if (var.ua == "") {
				call normalise_user_agent;
				set req.url = querystring.set(req.url, "ua", req.http.Normalized-User-Agent);
			}
		}

		if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js" && req.http.Filename && !req.http.Attempted-S3) {
			set req.backend = F_origin_s3_bundle;
			set req.url = "/" req.http.Filename;
		} else {
			if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js" || req.http.Orig-URL ~ "^/test/(director|tests?)/?" || req.http.Orig-URL ~ "^/v3/__gtg" || req.http.Orig-URL ~ "^/v3/__health") {
				call set_backend;
			} else {
				if (req.url.ext == "html") {
					error 910;
				}
				if (req.url.basename == "index") {
					error 910;
				}
				set req.backend = F_origin_s3_website;
			}
			# Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
			# If querystring is empty, remove the ? from the url.
			set req.url = querystring.clean(querystring.sort(req.url));
		}

		set req.http.Debug-Backend = req.backend;
		call set_backend_host;
	}
}

sub vcl_hash {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_hash;
		}

		# We are not adding req.http.host to the hash because we want https://cdn.polyfill.io and https://polyfill.io to be a single object in the cache.
		# set req.hash += req.http.host;
		set req.hash += req.url;
		# We include return(hash) to stop the function falling through to the default VCL built into varnish, which for vcl_hash will add req.url and req.http.Host to the hash.
		return(hash);
	}
}

sub prepare_backend_request {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js" && req.http.Filename && !req.http.Attempted-S3) {
			call generate_aws_authorization_header;
		} else {
			if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js" || req.http.Orig-URL ~ "^/test/(director|tests?)/?" || req.http.Orig-URL ~ "^/v3/__gtg" || req.http.Orig-URL ~ "^/v3/__health") {
				call prepend_path_with_lambda_stage;
			} else {
				set bereq.url = querystring.remove(req.url);
				if (bereq.url.basename == "") {
					set bereq.url = bereq.url "index.html";
				}
				if (bereq.url.ext == "") {
					set bereq.url = bereq.url ".html";
				}
				call generate_aws_authorization_header;
			}
		}

		unset bereq.http.Fastly-Debug;
		unset bereq.http.Orig-URL;
		unset bereq.http.Attempted-S3;
		unset bereq.http.Debug-Backend;
		unset bereq.http.useragent_parser_family;
		unset bereq.http.useragent_parser_major;
		unset bereq.http.useragent_parser_minor;
		unset bereq.http.useragent_parser_patch;
		unset bereq.http.normalized_user_agent_family;
		unset bereq.http.normalized_user_agent_major_version;
		unset bereq.http.normalized_user_agent_minor_version;
		unset bereq.http.Normalized-User-Agent;
		unset bereq.http.X-VCL-Route;
		unset bereq.http.X-PreFetch-Miss;
		unset bereq.http.X-PreFetch-Pass;
		unset bereq.http.Sorted-Parameter;
		unset bereq.http.Sort-Parameter;
		unset bereq.http.Fastly-Orig-Accept-Encoding;
	}
}

sub vcl_miss {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_miss;
		}

		call prepare_backend_request;
	}
}

sub vcl_pass {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_pass;
		}

		call prepare_backend_request;
	}
}

sub vcl_fetch {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_fetch;
		}

		# vcl_fetch is the last sub-routine that executes before the response is stored in the cache.
		if (!beresp.http.Cache-Control && beresp.status == 200) {
			set beresp.http.Cache-Control = "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800";
		}
		if (req.backend == F_origin_s3_website) {
			set beresp.http.Cache-Control = "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800";
			switch (bereq.url.ext) {
				case "html":
					set beresp.http.Content-Type = "text/html; charset=utf-8";
					break;
				case "css":
					set beresp.http.Content-Type = "text/css; charset=utf-8";
					break;
				case "js":
					set beresp.http.Content-Type = "application/javascript; charset=utf-8";
					break;
				case "json":
					set beresp.http.Content-Type = "application/json; charset=utf-8";
					break;
				case "map":
					set beresp.http.Content-Type = "application/json; charset=utf-8";
					break;
				case "png":
					set beresp.http.Content-Type = "image/png";
					break;
			}
		}

		# Ensure the site is only served over HTTPS and reduce the chances of someone performing a MITM attack.
		set beresp.http.Strict-Transport-Security = "max-age=31536000; includeSubdomains; preload";
		# Enables the cross-site scripting filter built into most modern web browsers.
		set beresp.http.X-XSS-Protection = "1; mode=block";
		# Prevents MIME-sniffing a response away from the declared content type.
		set beresp.http.X-Content-Type-Options = "nosniff";

		# Allow only content from the site's own origin (this excludes subdomains.)
		# Don't allow the website to be used within an iframe
		if (!beresp.http.Content-Security-Policy) {
			set beresp.http.Content-Security-Policy = "default-src 'self'; font-src 'self' https://www.ft.com; img-src 'self' https://www.ft.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
		}

		# The Referrer-Policy header governs which referrer information, sent in the Referer header, should be included with requests made.
		# Send a full URL when performing a same-origin request, but only send the origin of the document for other cases.
		set beresp.http.Referrer-Policy = "origin-when-cross-origin";

		# Enable purging of all objects in the Fastly cache by issuing a purge with the key "polyfill-service".
		if (beresp.http.Surrogate-Key !~ "\bpolyfill-service\b") {
            set beresp.http.Surrogate-Key = if(beresp.http.Surrogate-Key, beresp.http.Surrogate-Key " polyfill-service", "polyfill-service");
        }

		# We can't overwrite the etag header within AWS S3 so we overwrite it here instead.
		if (beresp.http.x-amz-meta-custom-etag) {
			set beresp.http.ETag = beresp.http.x-amz-meta-custom-etag;
		}

		set beresp.http.Timing-Allow-Origin = "*";

		set beresp.http.Normalized-User-Agent = req.http.Normalized-User-Agent;
		set beresp.http.Detected-User-Agent = req.http.useragent_parser_family "/"  req.http.useragent_parser_major "." req.http.useragent_parser_minor "." req.http.useragent_parser_patch;
	}
}

sub vcl_deliver {
	# Run this VCL only if the path is not to the polyfill-service v2 server
	if ((req.http.Orig-URL ~ "^/v3/") || req.http.Orig-URL ~ "^(?!/v2).+" && req.http.Orig-URL ~ "^(?!/__health).+" && req.http.Orig-URL ~ "^(?!/test/libs/proclaim/proclaim.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.js).+" && req.http.Orig-URL ~ "^(?!/test/libs/mocha/mocha.css).+" && req.http.Orig-URL ~ "^(?!/__gtg).+") {
		if (req.http.Fastly-Debug) {
			call breadcrumb_deliver;
		}

		set req.http.Fastly-Force-Shield = "yes";

		if (req.http.Filename && !req.http.Attempted-S3 && resp.status != 200) {
			set req.http.Attempted-S3 = "true";
			set req.url = req.http.Orig-URL;
			restart;
		}

		# Response will be a redirect if the body is larger than 5MB.
		if (req.http.Orig-URL ~ "^/v3/polyfill" && resp.status == 301) {
			# Restarting will make the request enter vcl_recv and check S3 again, where the file will now exist.
			restart;
		}

		# Serve a synthetic 404 response in order for us to customise the 404 page.
		# We use a synthetic response because we do not have an origin which handles all request paths.
		# We are doing this within vcl_deliver because we can then cache the actual 404 response into Fastly's cache which happens at the end of vcl_fetch.
		# We can not trigger an error from within vcl_deliver so we need to set a header on the request object, issue a restart and then trigger an error from within vcl_recv.
		if (resp.status == 404 && !req.http.route-does-not-exist) {
			set req.http.route-does-not-exist = "true";
			set req.url = req.http.Orig-URL;
  			restart;
		}

		# Allow cross origin GET, HEAD, and OPTIONS requests to be made.
		if (req.http.Origin) {
			set resp.http.Access-Control-Allow-Origin = "*";
			set resp.http.Access-Control-Allow-Methods = "GET,HEAD,OPTIONS";
		}

		add resp.http.Server-Timing = fastly_info.state {", fastly;desc="Edge time";dur="} time.elapsed.msec;

		if (req.http.Fastly-Debug) {
			set resp.http.Debug-Attempted-S3 = req.http.Attempted-S3;
			set resp.http.Debug-Backend = req.http.Debug-Backend;
			set resp.http.Debug-Host = req.http.Host;
			set resp.http.Debug-Fastly-Restarts = req.restarts;
			set resp.http.Debug-URL = req.url;
			set resp.http.Debug-Orig-URL = req.http.Orig-URL;
			set resp.http.Debug-Filename = req.http.Filename;
			set resp.http.Debug-VCL-Route = req.http.X-VCL-Route;
			set resp.http.useragent_parser_family = req.http.useragent_parser_family;
			set resp.http.useragent_parser_major = req.http.useragent_parser_major;
			set resp.http.useragent_parser_minor = req.http.useragent_parser_minor;
			set resp.http.useragent_parser_patch = req.http.useragent_parser_patch;
		} else {
			unset resp.http.Server;
			unset resp.http.Via;
			unset resp.http.x-amz-apigw-id;
			unset resp.http.X-Amz-Cf-Id;
			unset resp.http.x-amzn-RequestId;
			unset resp.http.X-Amzn-Trace-Id;
			unset resp.http.x-amz-id-2;
			unset resp.http.x-amz-meta-custom-etag;
			unset resp.http.x-amz-request-id;
			unset resp.http.X-Cache;
			unset resp.http.X-Cache-Hits;
			unset resp.http.X-Served-By;
			unset resp.http.X-Timer;
			unset resp.http.Fastly-Restarts;
		}
	}
}

sub vcl_error {
	if (obj.status == 910) {
		set obj.status = 404;
		set obj.response = "NOT FOUND";
		set obj.http.Content-Type = "text/html; charset=utf-8";
		set obj.http.Cache-Control = "private, no-store";
		synthetic "Cannot GET " req.http.Orig-URL;
		return (deliver);
	}

	if (obj.status == 911) {
		set obj.status = 405;
		set obj.response = "METHOD NOT ALLOWED";
		set obj.http.Content-Type = "text/html; charset=utf-8";
		set obj.http.Cache-Control = "private, no-store";
		synthetic req.method " METHOD NOT ALLOWED";
		return (deliver);
	}
	if (obj.status == 912) {
		set obj.status = 200;
		set obj.response = "OK";
		set obj.http.Allow = "OPTIONS, GET, HEAD";
		return (deliver);
	}
}
