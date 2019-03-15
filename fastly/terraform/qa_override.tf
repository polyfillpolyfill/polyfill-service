resource "fastly_service_v1" "app" {
  domain {
    name = "qa.polyfill.io"
  }

  backend {
    name                  = "v3_eu"
    address               = "origami-polyfill-service-qa-eu.herokuapp.com"
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
    host      = "origami-polyfill-service-qa-eu.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }

  backend {
    name                  = "v3_us"
    address               = "origami-polyfill-service-qa-us.herokuapp.com"
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
    host      = "origami-polyfill-service-qa-us.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
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
    source            = "\"origami-polyfill-service-qa-eu.herokuapp.com\""
    request_condition = "is_eu_server"
  }

  header {
    name              = "Set US Host"
    action            = "set"
    type              = "request"
    destination       = "http.Host"
    source            = "\"origami-polyfill-service-qa-us.herokuapp.com\""
    request_condition = "is_us_server"
  }
}
