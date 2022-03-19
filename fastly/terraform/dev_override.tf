resource "fastly_service_compute" "app" {
  name = "origami-polyfill-service-dev.edgecompute.app"

  domain {
    name = "origami-polyfill-service-dev.edgecompute.app"
  }

  director {
    name     = "polyfill"
    backends = ["v3_eu", "v3_us"]
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
    override_host         = "origami-polyfill-service-int.herokuapp.com"
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
    override_host         = "origami-polyfill-service-int.herokuapp.com"
  }

  healthcheck {
    name      = "v3_us_healthcheck"
    host      = "origami-polyfill-service-int.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }
}

resource "fastly_service_vcl" "app" {
  name = "dev.polyfill.io"

  domain {
    name = "dev.polyfill.io"
  }

  backend {
    name                  = "compute_at_edge"
    address               = "origami-polyfill-service-dev.edgecompute.app"
    port                  = 443
    healthcheck           = "compute_at_edge_healthcheck"
    ssl_cert_hostname     = "*.edgecompute.app"
    auto_loadbalance      = false
    connect_timeout       = 5000
    first_byte_timeout    = 120000
    between_bytes_timeout = 120000
    error_threshold       = 0
    override_host         = "origami-polyfill-service-dev.edgecompute.app"
  }

  healthcheck {
    name      = "compute_at_edge_healthcheck"
    host      = "origami-polyfill-service-dev.edgecompute.app"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
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
    override_host         = "origami-polyfill-service-int.herokuapp.com"
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
    override_host         = "origami-polyfill-service-int.herokuapp.com"
  }

  healthcheck {
    name      = "v3_us_healthcheck"
    host      = "origami-polyfill-service-int.herokuapp.com"
    path      = "/__gtg"
    timeout   = 5000
    threshold = 2
    window    = 5
  }
}
