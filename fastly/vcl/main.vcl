import querystring;

sub sort_comma_separated_querystring_parameter {
	#  Store the url without the querystring into a temporary header.
	declare local var.url STRING;
	set var.url = querystring.remove("https://www.example.com");
	declare local var.parameter STRING;
	set var.parameter = req.http.Sort-Parameter;
	# If query parameter does not exist or is empty, set it to ""
	set var.parameter = if(var.parameter != "", var.parameter, "");
	# Replace all `&` characters with `^`, this is because `&` would break the parameter up into pieces.
	set var.parameter = regsuball(var.parameter, "&", "^");
	# Replace all `,` characters with `&` to break them into individual query parameters
	# Append `1-` infront of all the query parameters to make them simpler to transform later
	set var.parameter = "1-" regsuball(var.parameter, ",", "&1-");
	set var.url = var.url "?" var.parameter;
	set var.url = querystring.sort(var.url);
	# Grab all the query parameters from the sorted url
	set var.parameter = regsub(var.url, "(.*)\?(.*)", "\2");
	# Reverse all the previous transformations to get back the single `features` query parameter value
	set var.parameter = regsuball(var.parameter, "1-", "");
	set var.parameter = regsuball(var.parameter, "&", ",");
	set var.parameter = regsuball(var.parameter, "\^", "&");
	set req.http.Sorted-Parameter = var.parameter;
}

sub normalise_querystring_parameters_for_polyfill_bundle {
	# Store the url without the querystring into a temporary header.
	declare local var.url STRING;
	set var.url = querystring.remove(req.url);
	declare local var.querystring STRING;
	set var.querystring = "?";
	declare local var.features STRING;
	set var.features = urldecode(subfield(req.url.qs, "features", "&"));
	set var.features = if(var.features != "", var.features, "default");
	if (std.strlen(var.features) < 200) {
		set req.http.Sort-Parameter = var.features;
		call sort_comma_separated_querystring_parameter;
		set var.querystring = var.querystring "&features=" req.http.Sorted-Parameter;
	} else {
		set var.querystring = var.querystring "&features=" var.features;
	}
	declare local var.excludes STRING;
	set var.excludes = urldecode(subfield(req.url.qs, "excludes", "&"));
	if (std.strlen(var.excludes) < 200) {
		set req.http.Sort-Parameter = var.excludes;
		call sort_comma_separated_querystring_parameter;
		set var.querystring = var.querystring "&excludes=" req.http.Sorted-Parameter;
	} else {
		set var.querystring = var.querystring "&excludes=" var.excludes;
	}
	declare local var.rum STRING;
	set var.rum = urlencode(urldecode(subfield(req.url.qs, "rum", "&")));
	set var.querystring = var.querystring "&rum=" if(var.rum != "", var.rum, "0");
	declare local var.unknown STRING;
	set var.unknown = urlencode(urldecode(subfield(req.url.qs, "unknown", "&")));
	set var.querystring = var.querystring "&unknown=" if(var.unknown != "", var.unknown, "polyfill");
	declare local var.flags STRING;
	set var.flags = urlencode(urldecode(subfield(req.url.qs, "flags", "&")));
	set var.querystring = var.querystring "&flags=" if(var.flags != "", var.flags, "");
	declare local var.version STRING;
	set var.version = urlencode(urldecode(subfield(req.url.qs, "version", "&")));
	if (var.version != "") {
		set var.querystring = var.querystring "&version=" var.version;
	}
	declare local var.ua STRING;
	set var.ua = urlencode(urldecode(subfield(req.url.qs, "ua", "&")));
	if (var.ua != "") {
		set var.querystring = var.querystring "&ua=" var.ua;
	} else {
		switch (var.version) {
			case "3.1.0": fallthrough;
			case "3.1.2": fallthrough;
			case "3.2.0": fallthrough;
			case "3.3.0": fallthrough;
			case "3.4.0": fallthrough;
			case "3.4.1": fallthrough;
			case "3.4.2": fallthrough;
			case "3.5.0": fallthrough;
			case "3.6.0": fallthrough;
			case "3.6.1": fallthrough;
			case "3.7.0": fallthrough;
			case "3.8.0": fallthrough;
			case "3.8.1": fallthrough;
			case "3.9.0": fallthrough;
			case "3.9.1": fallthrough;
			case "3.9.2": fallthrough;
			case "3.10.0": fallthrough;
			case "3.11.0": fallthrough;
			case "3.12.0": fallthrough;
			case "3.12.1": fallthrough;
			case "3.13.0": fallthrough;
			case "3.14.0": fallthrough;
			case "3.15.0": fallthrough;
			case "3.16.0": fallthrough;
			case "3.17.0": fallthrough;
			case "3.18.0": fallthrough;
			case "3.18.1": fallthrough;
			case "3.18.2": fallthrough;
			case "3.19.0": fallthrough;
			case "3.20.0": fallthrough;
			case "3.20.1": fallthrough;
			case "3.20.2": fallthrough;
			case "3.21.0": fallthrough;
			case "3.21.1": fallthrough;
			case "3.21.2": fallthrough;
			case "3.21.3": fallthrough;
			case "3.21.4": fallthrough;
			case "3.22.0": fallthrough;
			case "3.23.0": fallthrough;
			case "3.24.0": fallthrough;
			case "3.25.1": call normalise_user_agent; break;
			default: call normalise_user_agent_latest; break;
		}
		set var.querystring = var.querystring "&ua=" req.http.Normalized-User-Agent;
	}
	declare local var.callback STRING;
	set var.callback = urlencode(urldecode(subfield(req.url.qs, "callback", "&")));
	if (var.callback != "" && var.callback ~ "^[\w\.]+$") {
		set var.querystring = var.querystring "&callback=" var.callback;
	} else {
		set var.querystring = var.querystring "&callback=";
	}
	declare local var.compression STRING;
	set var.compression = urlencode(urldecode(subfield(req.url.qs, "compression", "&")));
	if (var.compression == "") {
		if (req.http.Fastly-Orig-Accept-Encoding && req.http.User-Agent !~ "MSIE 6") {
			if (req.http.Fastly-Orig-Accept-Encoding ~ "br") {
				set var.compression = "br";
			} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "gzip") {
				set var.compression = "gzip";
			}
		}
	}
	set var.querystring = var.querystring "&compression=" var.compression;
	set req.url = var.url var.querystring;
}

include "useragent-parser.vcl";
include "normalise-user-agent.vcl";
include "normalise-user-agent-latest.vcl";

# The Fastly VCL boilerplate.
include "fastly-boilerplate-begin.vcl";

include "breadcrumbs.vcl";
include "redirects.vcl";
include "synthetic-responses.vcl";
include "polyfill-service.vcl";

# Finally include the last bit of VCL, this _must_ be last!
include "fastly-boilerplate-end.vcl";
