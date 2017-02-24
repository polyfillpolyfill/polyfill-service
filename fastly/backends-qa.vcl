backend origami_polyfill_service_us {
	.connect_timeout = 2s;
	.dynamic = true;
	.port = "80";
	.host = "origami-polyfill-service-us.herokuapp.com";
	.first_byte_timeout = 30s;
	.max_connections = 200;
	.between_bytes_timeout = 20s;
    .probe = {
        .request = "HEAD /__health HTTP/1.1"  "Host: origami-polyfill-service-us.herokuapp.com" "Connection: close";
        .window = 2;
        .threshold = 1;
        .timeout = 5s;
        .initial = 1;
        .dummy = true;
    }
}

backend origami_polyfill_service_eu {
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
        .dummy = true;
    }
}
