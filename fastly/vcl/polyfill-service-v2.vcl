sub vcl_recv {
    if (req.http.Orig-URL ~ "^/v2") {
        set req.url = regsub(req.url, "^/v2", "/v3");

        # Override the v3 defaults with the defaults of v2
        if (req.http.Orig-URL ~ "^/v3/polyfill(\.min)?\.js") {
            set req.url = querystring.set(req.url, "version", "3.25.1");
            declare local var.unknown STRING;
            set var.unknown = subfield(req.url.qs, "unknown", "&");
            set req.url = querystring.set(req.url, "unknown", if(var.unknown != "", var.unknown, "ignore"));
        }
    }
}