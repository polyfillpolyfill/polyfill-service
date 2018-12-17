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
    if (req.http.Orig-URL ~ "^/v2" || req.http.Orig-URL ~ "^/__health" || req.http.Orig-URL ~ "^/test/libs/proclaim/proclaim.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.css" || req.http.Orig-URL ~ "^/__gtg") {
        if (req.url ~ "^/v2/(polyfill\.|recordRumData)" && req.url !~ "[\?\&]ua=") {
            set req.http.X-Orig-URL = req.url;
            set req.url = "/v2/normalizeUa?ua=" urlencode(req.http.User-Agent);
        }

        if (req.url ~ "^/v2/recordRumData" && req.http.Normalized-User-Agent) {
            # Return an empty response to the client
            error 909;
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
}

sub vcl_fetch {
    if (req.http.Orig-URL ~ "^/v2" || req.http.Orig-URL ~ "^/__health" || req.http.Orig-URL ~ "^/test/libs/proclaim/proclaim.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.css" || req.http.Orig-URL ~ "^/__gtg") {
        # Enable purging of all objects in the Fastly cache by issuing a purge with the key "polyfill-service".
        if (beresp.http.Surrogate-Key !~ "\bpolyfill-service\b") {
            set beresp.http.Surrogate-Key = if(beresp.http.Surrogate-Key, beresp.http.Surrogate-Key " polyfill-service", "polyfill-service");
        }

        # Deliver stale if possible when unexpected errors are received from origin
        # This includes 404s because Heroku will deliver a 404 if you hit the 'no app
        # found' page.
        if ((beresp.status >= 500 && beresp.status < 600) ||  beresp.status == 404) {
            if (stale.exists) {
                return(deliver_stale);
            }
        }

        return(deliver);
    }
}

sub vcl_deliver {
    if (req.http.Orig-URL ~ "^/v2" || req.http.Orig-URL ~ "^/__health" || req.http.Orig-URL ~ "^/test/libs/proclaim/proclaim.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.js" || req.http.Orig-URL ~ "^/test/libs/mocha/mocha.css" || req.http.Orig-URL ~ "^/__gtg") {
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
}

sub vcl_error {
	# RUM response
	if (obj.status == 909) {
		set obj.status = 204;
		set obj.response = "No Content";
		set obj.http.Cache-Control = "private, no-store";
		return(deliver);
	}
}