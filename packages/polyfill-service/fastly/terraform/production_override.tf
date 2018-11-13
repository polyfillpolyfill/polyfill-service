resource "fastly_service_v1" "app" {
  domain {
    name = "polyfill.io"
  }

  domain {
    name = "cdn.polyfill.io"
  }

  domain {
    name = "cdn.polyfills.io"
  }

  domain {
    name = "polyfills.io"
  }

  domain {
    name = "polyfill.webservices.ft.com"
  }

  backend {
    name                  = "v3_eu"
    address               = "origami-polyfill-service-eu.herokuapp.com"
    port                  = 443
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
  }

  backend {
    name                  = "v3_us"
    address               = "origami-polyfill-service-us.herokuapp.com"
    port                  = 443
    ssl_cert_hostname     = "*.herokuapp.com"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
  }

  condition {
    name      = "is_eu_server"
    statement = "req.backend == F_v3_eu"
    type      = "REQUEST"
    priority  = 10
  }

  condition {
    name      = "is_us_server"
    statement = "req.backend == F_v3_us"
    type      = "REQUEST"
    priority  = 10
  }

  header {
    name              = "Set EU Host"
    action            = "set"
    type              = "request"
    destination       = "http.Host"
    source            = "\"origami-polyfill-service-eu.herokuapp.com\""
    request_condition = "is_eu_server"
  }

  header {
    name              = "Set US Host"
    action            = "set"
    type              = "request"
    destination       = "http.Host"
    source            = "\"origami-polyfill-service-us.herokuapp.com\""
    request_condition = "is_us_server"
  }
}
