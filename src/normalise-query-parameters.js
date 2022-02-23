import * as latestUserAgentNormaliser from "./normalise-user-agent-1-10-1.js";
import * as oldUserAgentNormaliser from "./normalise-user-agent-for-polyfill-library-3-25-1.js";

function sort_comma_separated_value(value = "") {
    return value.split(',').sort((a, b) => a.localeCompare(b)).join(',');
}

export function normalise_querystring_parameters_for_polyfill_bundle(originalRequest, currentQuerystring) {
    const newQuerystring = new URLSearchParams;

    let features;
    if (features = currentQuerystring.get('features')) {
		// # Parameter has already been set, use the already set value.
        features = sort_comma_separated_value(decodeURIComponent(features));
        newQuerystring.set('features', features);
	} else {
		// # Parameter has not been set, use the default value.
        newQuerystring.set('features', "default");
	}

	let excludes;
	if (excludes = currentQuerystring.get('excludes')) {
		// # Parameter has already been set, use the already set value.
        excludes = sort_comma_separated_value(decodeURIComponent(excludes));
        newQuerystring.set('excludes', excludes);
	} else {
		newQuerystring.set('excludes', "");
	}

    let rum;
	if (rum = currentQuerystring.get('rum')) {
        newQuerystring.set('rum', rum);
	} else {
        // # If rum is not set, set to default value "0"
		newQuerystring.set('rum', "0");
	}

    let unknown;
	if (unknown = currentQuerystring.get('unknown')) {
        newQuerystring.set('unknown', unknown);
	} else {
        // # If unknown is not set, set to default value "polyfill"
		newQuerystring.set('unknown', "polyfill");
	}

    let flags;
	if (flags = currentQuerystring.get('flags')) {
        // # Parameter has already been set, use the already set value.
        flags = decodeURIComponent(flags);
        newQuerystring.set('flags', flags);
	} else {
        // # If flags is not set, set to default value ""
		newQuerystring.set('flags', "");
	}

	// # If version is not set, set to default value
    let version;
	if (version = currentQuerystring.get('version')) {
        switch (version) {
            case "3.110.1":
            case "3.109.0":
            case "3.108.0":
            case "3.104.0":
            case "3.103.0":
            case "3.101.0":
            case "3.100.0":
            case "3.98.0":
            case "3.96.0":
            case "3.89.4":
            case "3.53.1":
            case "3.52.3":
            case "3.52.2":
            case "3.52.1":
            case "3.52.0":
            case "3.51.0":
            case "3.50.2":
            case "3.49.0":
            case "3.48.0":
            case "3.46.0":
            case "3.45.0":
            case "3.44.0":
            case "3.43.0":
            case "3.42.0":
            case "3.41.0":
            case "3.40.0":
            case "3.39.0":
            case "3.38.0":
            case "3.37.0":
            case "3.36.0":
            case "3.35.0":
            case "3.34.0":
            case "3.28.1":
            case "3.27.4":
            case "3.25.3":
            case "3.25.2":
            case "3.25.1": {
                newQuerystring.set('version', version);
                break;
            }
            default: {
                newQuerystring.set('version', "");
            }
        }
	} else {
		newQuerystring.set('version', "");
	}

    let ua;
	if (ua = currentQuerystring.get('ua')) {
        newQuerystring.set("ua", decodeURIComponent(ua));
    } else {
        // # If ua is not set, normalise the User-Agent header based upon the version of the polyfill-library that has been requested.
        const useragent = originalRequest.headers["user-agent"];
        let normalisedUserAgent;
		if (version === "3.25.1") {
			normalisedUserAgent = oldUserAgentNormaliser.UA(useragent);
		} else {
            normalisedUserAgent = latestUserAgentNormaliser.UA.normalize(useragent);
		}
		newQuerystring.set("ua", normalisedUserAgent);
	}

    let callback;
	if (callback = currentQuerystring.get('callback')) {
        newQuerystring.set('callback', callback);
	} else {
        // # If callback is not set, set to default value ""
		newQuerystring.set('callback', "");
	}

    let compression;
	if (compression = currentQuerystring.get('compression')) {
        newQuerystring.set("compression", compression);
	} else {
        // # If compression is not set, use the best compression that the user-agent supports.
		// # Before SP2, IE/6 doesn't always read and cache gzipped content correctly.
        let acceptEncoding = originalRequest.headers['accept-encoding']
        let isNotIE6 = originalRequest.headers['user-agent'] && !originalRequest.headers['user-agent'].includes("MSIE 6")
		if (acceptEncoding && isNotIE6) {
			if (acceptEncoding.includes("br")) {
				newQuerystring.set("compression", "br");
			} else if (acceptEncoding.includes("gzip")) {
				newQuerystring.set("compression", "gzip");
			} else {
				newQuerystring.set("compression", "");
			}
		} else {
			newQuerystring.set("compression", "");
		}
	}
	return newQuerystring;
}