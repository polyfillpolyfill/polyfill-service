resource "fastly_service_v1" "app" {
  domain {
    name = "origami-polyfill-service-dev.in.ft.com"
  }

  backend {
    name                  = "v3_eu"
    address               = "origami-polyfill-service-int.herokuapp.com"
    port                  = 443
    healthcheck           = "v3_eu_healthcheck"
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    shield                = "london_city-uk"
  }

  healthcheck {
    name      = "v3_eu_healthcheck"
    host      = "origami-polyfill-service-int.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }

  backend {
    name                  = "v3_us"
    address               = "origami-polyfill-service-int.herokuapp.com"
    port                  = 443
    healthcheck           = "v3_us_healthcheck"
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    shield                = "iad-va-us"
  }

  healthcheck {
    name      = "v3_us_healthcheck"
    host      = "origami-polyfill-service-int.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }

  header {
    name        = "EU Host"
    action      = "set"
    type        = "request"
    destination = "http.EU_Host"
    source      = "\"origami-polyfill-service-int.herokuapp.com\""
  }

  header {
    name        = "US Host"
    action      = "set"
    type        = "request"
    destination = "http.US_Host"
    source      = "\"origami-polyfill-service-int.herokuapp.com\""
  }
}
