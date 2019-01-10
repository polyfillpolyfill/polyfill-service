import querystring;

sub sort_comma_separated_value {
	# This function takes a CSV and tranforms it into a url where each
	# comma-separated-value is a query-string parameter and then uses 
	# Fastly's querystring.sort function to sort the values. Once sorted
	# it then turn the query-parameters back into a CSV.
	# Set the CSV on the header `Sort-Value`.
	# Returns the sorted CSV on the header `Sorted-Value`.
	declare local var.value STRING;
	set var.value = req.http.Sort-value;

	# If query value does not exist or is empty, set it to ""
	set var.value = if(var.value != "", var.value, "");

	# Replace all `&` characters with `^`, this is because `&` would break the value up into pieces.
	set var.value = regsuball(var.value, "&", "^");

	# Replace all `,` characters with `&` to break them into individual query values
	# Append `1-` infront of all the query values to make them simpler to transform later
	set var.value = "1-" regsuball(var.value, ",", "&1-");
	
	# Create a querystring-like string in order for querystring.sort to work.
	set var.value = querystring.sort("?" var.value);

	# Grab all the query values from the sorted url
	set var.value = regsub(var.value, "\?", "");
	
	# Reverse all the previous transformations to get back the single `features` query value value
	set var.value = regsuball(var.value, "1-", "");
	set var.value = regsuball(var.value, "&", ",");
	set var.value = regsuball(var.value, "\^", "&");

	set req.http.Sorted-Value = var.value;
}

sub normalise_querystring_parameters_for_polyfill_bundle {
	# Store the url without the querystring into a temporary header.
	declare local var.url STRING;
	set var.url = querystring.remove(req.url);

	declare local var.querystring STRING;
	set var.querystring = "?";

	# Remove all querystring parameters which are not part of the public API.
	# set req.url = querystring.regfilter_except(req.url, "^(features|excludes|rum|unknown|flags|version|ua|callback|compression)$");

	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `features=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*features=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		if (std.strlen(re.group.1) < 100) {
			# We add the value of the features parameter to this header
			# This is to be able to have sort_comma_separated_value sort the value
			set req.http.Sort-Value = urldecode(re.group.1);
			call sort_comma_separated_value;
			# The header Sorted-Value now contains the sorted version of the features parameter.
			set var.querystring = querystring.set(var.querystring, "features", req.http.Sorted-Value);
		}
	} else {
		# Parameter has not been set, use the default value.
		set var.querystring = querystring.set(var.querystring, "features", "default");
	}
	
	# (?i) makes the regex case-insensitive
	# The regex will match only if their are characters after `excludes=` which are not an ampersand (&).
	if (req.url.qs ~ "(?i)[^&=]*excludes=([^&]+)") {
		# Parameter has already been set, use the already set value.
		# re.group.1 is the first regex capture group in the regex above.
		if (std.strlen(re.group.1) < 100) {
			# We add the value of the excludes parameter to this header
			# This is to be able to have sort_comma_separated_value sort the value
			set req.http.Sort-Value = urldecode(re.group.1);
			call sort_comma_separated_value;
			# The header Sorted-Value now contains the sorted version of the excludes parameter.
			set var.querystring = querystring.set(var.querystring, "excludes", req.http.Sorted-Value);
		}
	} else {
		# If excludes is not set, set to default value ""
		set var.querystring = var.querystring "&excludes=";
	}
	
	# If rum is not set, set to default value "0"
	if (req.url.qs !~ "(?i)[^&=]*rum=([^&]+)") {
		set var.querystring = querystring.set(var.querystring, "rum", "0");
	} else {
		set var.querystring = querystring.set(var.querystring, "rum", re.group.1);
	}
	
	# If unknown is not set, set to default value "polyfill"
	if (req.url.qs !~ "(?i)[^&=]*unknown=([^&]+)") {
		set var.querystring = querystring.set(var.querystring, "unknown", "polyfill");
	} else {
		set var.querystring = querystring.set(var.querystring, "unknown", re.group.1);
	}

	# If flags is not set, set to default value ""
	if (req.url.qs !~ "(?i)[^&=]*flags=([^&]+)") {
		set var.querystring = var.querystring "&flags=";
	} else {
		set var.querystring = querystring.set(var.querystring, "flags", re.group.1);
	}

	# If version is not set, set to default value ""
	declare local var.version STRING;
	if (req.url.qs !~ "(?i)[^&=]*version=([^&]+)") {
		set var.querystring = var.querystring "&version=";
	} else {
		set var.querystring = querystring.set(var.querystring, "version", re.group.1);
	}
	
	# If ua is not set, normalise the User-Agent header based upon the version of the polyfill-library that has been requested.
	if (req.url.qs !~ "(?i)[^&=]*ua=([^&]+)") {
		if (req.url.qs ~ "(?i)[^&=]*version=3\.25\.1(&|$)") {
			call normalise_user_agent_3_25_1;
		} else {
			call normalise_user_agent_latest;
		}
		set var.querystring = querystring.set(var.querystring, "ua", req.http.Normalized-User-Agent);
	} else {
		set var.querystring = querystring.set(var.querystring, "ua", re.group.1);
	}

	# If callback is not set, set to default value ""
	if (req.url.qs !~ "(?i)[^&=]*callback=([^&]+)") {
		set var.querystring = var.querystring "&callback=";
	} else {
		set var.querystring = querystring.set(var.querystring, "callback", re.group.1);
	}
	
	# If compression is not set, use the best compression that the user-agent supports.
	if (req.url.qs !~ "(?i)[^&=]*compression=([^&]+)") {
		# When Fastly adds Brotli into the Accept-Encoding normalisation we can replace this with: 
		# `set var.querystring = querystring.set(var.querystring, "compression", req.http.Accept-Encoding || "")`

		# Before SP2, IE/6 doesn't always read and cache gzipped content correctly.
		if (req.http.Fastly-Orig-Accept-Encoding && req.http.User-Agent !~ "MSIE 6") {
			if (req.http.Fastly-Orig-Accept-Encoding ~ "br") {
				set var.querystring = querystring.set(var.querystring, "compression", "br");
			} elsif (req.http.Fastly-Orig-Accept-Encoding ~ "gzip") {
				set var.querystring = querystring.set(var.querystring, "compression", "gzip");
			} else {
				set var.querystring = var.querystring "&compression=";
			}
		} else {
			set var.querystring = var.querystring "&compression=";
		}
	} else {
		set var.querystring = querystring.set(var.querystring, "compression", re.group.1);
	}
	set req.url = var.url var.querystring;
}

include "../../node_modules/@financial-times/useragent_parser/lib/ua_parser.vcl";
include "normalise-user-agent-3-25-1.vcl";
include "normalise-user-agent-latest.vcl";

# The Fastly VCL boilerplate.
include "fastly-boilerplate-begin.vcl";

include "breadcrumbs.vcl";
include "redirects.vcl";
include "synthetic-responses.vcl";
include "polyfill-service.vcl";

# Finally include the last bit of VCL, this _must_ be last!
include "fastly-boilerplate-end.vcl";
