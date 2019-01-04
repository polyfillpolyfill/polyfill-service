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
	# Store the url without the querystring into a variable for use later.
	declare local var.url STRING;
	set var.url = querystring.remove(req.url);
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `features=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*features=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		if (std.strlen(re.group.1) < 200) {
			# We add the value of the features parameter to this header
			# This is to be able to have sort_comma_separated_querystring_parameter sort the value
			set req.http.Sort-Parameter = re.group.1;
			call sort_comma_separated_querystring_parameter;
			# The header Sorted-Parameter now contains the sorted version of the features parameter.
			set var.url = querystring.set(var.url, "features", req.http.Sorted-Parameter);
		}
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "features", "default");
	}
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `excludes=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*excludes=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		if (std.strlen(re.group.1) < 200) {
			# We add the value of the excludes parameter to this header
			# This is to be able to have sort_comma_separated_querystring_parameter sort the value
			set req.http.Sort-Parameter = re.group.1;
			call sort_comma_separated_querystring_parameter;
			# The header Sorted-Parameter now contains the sorted version of the excludes parameter.
			set var.url = querystring.set(var.url, "excludes", req.http.Sorted-Parameter);
		}
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "excludes", "");
	}
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `rum=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*rum=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "rum", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "rum", "0");
	}
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `unknown=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*unknown=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "unknown", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "unknown", "polyfill");
	}

	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `flags=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*flags=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "flags", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "flags", "");
	}

	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `version=` which are not an ampersand (&).
	declare local var.version STRING;
	if (req.url.qs ~ "(?i)[^&=]*version=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "version", re.group.1);
		set var.version = re.group.1;
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "version", "");
	}

	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `ua=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*ua=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "ua", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		# The default value is different dependant upon which version of the polyfill-library has been set.
		if (var.version == "3.25.1") {
			call normalise_user_agent;
		} else {
			call normalise_user_agent_latest;
		}
		set var.url = querystring.set(var.url, "ua", req.http.Normalized-User-Agent);
	}

	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `callback=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*callback=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "callback", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		set var.url = querystring.set(var.url, "callback", "");
	}
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `compression=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*compression=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		set var.url = querystring.set(var.url, "compression", re.group.1);
	} else {
		# Parameter has not been set, use the default value.
		# The default value is dependant upon what the user-agent supports.
		if (req.http.Fastly-Orig-Accept-Encoding && req.http.User-Agent !~ "MSIE 6") {
			if (req.http.Fastly-Orig-Accept-Encoding ~ "br") {
				set var.url = querystring.set(var.url, "compression", "br");
			} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "gzip") {
				set var.url = querystring.set(var.url, "compression", "gzip");
			} else {
				set var.url = querystring.set(var.url, "compression", "gzip");
			}
		} else {
			set var.url = querystring.set(var.url, "compression", "gzip");
		}
	}
	set req.url = var.url;
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
